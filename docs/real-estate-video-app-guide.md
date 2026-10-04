# Building a Real Estate Walkthrough Video App with Higgsfield

This guide documents the pipeline that turns a set of property photos into a finished, branded MP4 walkthrough using Higgsfield and FFmpeg, and how to turn that pipeline into an app.

How photos are collected (listing links, Airbnb links, uploads, watermark removal) is **not** covered here. See `product-specification.md`.

**Proven example:** photos of an 87 m² penthouse in Voula became a 24-second 1080p MP4 for 30 Higgsfield credits.

---

## 1. Pipeline overview

```
Property photos (image files + title/price/location text, supplied by the app)
   |
   v
[1] Photos in (outside this guide)
   |
   v
[2] Import photos into Higgsfield storage -> media_id per photo
   |
   v
[3] Cost preflight (get_cost) -> show user the price, get approval
   |
   v
[4] Image-to-video, one clip per photo (batch) -> 5s clips
   |
   v
[5] Wait for all jobs (jobs_wait)
   |
   v
[6] Assemble with FFmpeg: title card + clips + crossfades + end card
   |
   v
[7] Upload final MP4 -> hosted URL returned to the user
```

Steps 2-5 use Higgsfield. Steps 6-7 use FFmpeg. Higgsfield does not stitch clips together or add text overlays for this workflow, so FFmpeg is required.

---

## 2. Tools used, step by step

### Step 1: Photos in (outside this guide)

This guide starts when the photos already exist as image files in your storage, in the order they should appear in the video, together with the text for the title and end cards (title, subtitle, location/price line, closing line).

Where the photos come from, and how they are cleaned up beforehand, is defined in `product-specification.md`.

Input expectations for the steps below:
- JPG, PNG or WebP, ideally at least 1024 px on the longest side
- 3 to 12 photos per video
- Only photos you own or have permission to use

### Step 2: Import photos into Higgsfield

Tool: `media_import_url`

```json
{ "url": "https://storage.example.com/signed-url-to-photo.jpg", "type": "image" }
```

Returns a `media_id`. Higgsfield generation tools take `media_id` values, never raw URLs. The URL must be HTTPS and the payload at most 50 MB. In the app, pass a short-lived signed URL for the stored photo. Imports are independent, so run them in parallel.

### Step 3: Pick the model and preflight the cost

Tool: `models_explore` with `action: "recommend"`, `input: "image"`, `type: "video"`.

Model used: **`cinematic_studio_video_v2`** (Cinema Studio Video).
- Image-to-video via `start_image` role
- Aspect ratios: 1:1, 4:3, 3:4, 16:9, 9:16
- Duration: 3-12 seconds
- Genre option (we used `intimate` for calm, refined color)
- Audio on by default (`sound: "off"` for silent)

Alternatives returned by the recommender: `grok_video_v15`, `seedance_2_5`, `cinematic_studio_video_4_0`, `kling3_0`. Compare quality and cost on a few of your own listings before locking one in.

Cost preflight: call `generate_video` with `"get_cost": true`. This submits no job.

```json
{
  "model": "cinematic_studio_video_v2",
  "aspect_ratio": "16:9",
  "duration": 5,
  "get_cost": true,
  "medias": [{ "role": "start_image", "value": "<media_id>" }],
  "prompt": "..."
}
```

Result in our test: **7.5 credits per 5-second clip**. Show the user the total before generating.

### Step 4: Generate the clips (batch)

Tool: `generate_video_batch` (1-12 requests per call, each with a stable `index`).

```json
{
  "requests": [
    {
      "index": 1,
      "params": {
        "model": "cinematic_studio_video_v2",
        "aspect_ratio": "16:9",
        "duration": 5,
        "genre": "intimate",
        "medias": [{ "role": "start_image", "value": "<media_id>" }],
        "prompt": "Cinematic luxury real estate reveal, smooth slow dolly push-in..."
      }
    }
  ]
}
```

Handle partial failure: a batch can succeed for some indices and fail for others. In our run, 4 of 5 submitted; index 3 failed with "Out of credits". Keep the returned `job_id` values and retry only the failed indices. Never resubmit the whole batch.

### Step 5: Wait for completion

Tool: `jobs_wait` (up to 12 jobs, max 15 seconds per call). Repeat until `all_terminal: true`. Our clips took roughly one to two minutes in total. Results contain `result_url` values.

Optional display tool for humans: `show_generation_by_ids` (one call for the whole set, never one per job).

### Step 6: Assemble with FFmpeg

Tool: `sandbox_exec`, which is a cloud Linux sandbox with FFmpeg, Python, and fonts preinstalled.

**If you build your own app, run FFmpeg on your own server instead.** The sandbox is only for Higgsfield-hosted workflows.

What the assembly script did:
1. Downloaded the four clips from the Higgsfield result URLs.
2. Generated a 4-second title card and a 4-second end card with `color` + `drawtext`.
3. Normalized every clip to 1920x1080, 30 fps. The generated clips came back near 1100x800 (not 16:9), so each was placed over a blurred, enlarged copy of itself.
4. Chained `xfade` (video) and `acrossfade` (audio) with 0.8-second transitions.
5. Added a 1-second fade-out at the end.
6. Encoded H.264 (CRF 17) + AAC 192k with `+faststart`.

Core of the script:

```python
import subprocess

F = "/usr/share/fonts/truetype/higgsfield/Montserrat-ExtraBold.ttf"  # use your own font path

def run(cmd): subprocess.run(cmd, check=True)

def card(out, lines):
    vf = [
        f"drawtext=fontfile={F}:textfile={f}:fontsize={size}:fontcolor={col}"
        f":x=(w-text_w)/2:y={y}:alpha='min(1,max(0,(t-{fade})/0.8))'"
        for f, size, col, y, fade in lines
    ]
    run(["ffmpeg","-y","-f","lavfi","-i","color=c=0x0b1220:s=1920x1080:r=30:d=4",
         "-f","lavfi","-i","anullsrc=r=44100:cl=stereo","-t","4","-vf",",".join(vf),
         "-c:v","libx264","-crf","17","-pix_fmt","yuv420p","-r","30",
         "-c:a","aac","-ar","44100","-ac","2","-shortest",out])

# Normalize each clip: blurred fill + centered fit
for i in range(1, 5):
    run(["ffmpeg","-y","-i",f"c{i}.mp4","-filter_complex",
         "[0:v]split[a][b];"
         "[a]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,"
         "boxblur=30:5,eq=brightness=-0.08[bg];"
         "[b]scale=-2:1080[fg];"
         "[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,format=yuv420p[v]",
         "-map","[v]","-map","0:a","-c:v","libx264","-crf","17","-preset","medium",
         "-c:a","aac","-ar","44100","-ac","2",f"n{i}.mp4"])

# Crossfade chain
files = ["title.mp4","n1.mp4","n2.mp4","n3.mp4","n4.mp4","end.mp4"]
def dur(f):
    return float(subprocess.check_output(
        ["ffprobe","-v","error","-select_streams","v:0",
         "-show_entries","stream=duration","-of","csv=p=0",f]).decode())
d = [dur(f) for f in files]
T = 0.8
fc, cur, acur, total = [], "[0:v]", "[0:a]", d[0]
for i in range(1, len(files)):
    fc.append(f"{cur}[{i}:v]xfade=transition=fade:duration={T}:offset={total-T:.3f}[v{i}]")
    fc.append(f"{acur}[{i}:a]acrossfade=d={T}[a{i}]")
    cur, acur = f"[v{i}]", f"[a{i}]"
    total += d[i] - T
fc.append(f"{cur}fade=t=out:st={total-1:.3f}:d=1[vf]")
fc.append(f"{acur}afade=t=out:st={total-1:.3f}:d=1[af]")
cmd = ["ffmpeg","-y"]
for f in files: cmd += ["-i", f]
cmd += ["-filter_complex",";".join(fc),"-map","[vf]","-map","[af]",
        "-c:v","libx264","-crf","17","-preset","medium","-pix_fmt","yuv420p","-r","30",
        "-profile:v","high","-c:a","aac","-b:a","192k","-movflags","+faststart","final.mp4"]
run(cmd)
```

Run long encodes in the background and poll. The sandbox command limit is 120 seconds in the foreground.

### Step 7: Upload and deliver

Tools: `media_upload` then `media_confirm`.

1. Call `media_upload` with the filename (`video/mp4`). It returns `upload_url`, `media_id`, and the final CDN `url`.
2. In the same sandbox command that made the file, upload it:
   ```bash
   curl -sS -o /dev/null -w "HTTP %{http_code}\n" -X PUT \
     -H "Content-Type: video/mp4" --upload-file final.mp4 '<upload_url>'
   ```
3. Only after HTTP 200, call `media_confirm` with `type: "video"` and the `media_id`.
4. Hand the user the URL returned by `media_confirm`.

---

## 3. Prompt templates

Use one prompt per room type, with a slow camera move. Keep prompts short and concrete.

| Shot | Prompt starter |
|---|---|
| Exterior | "Cinematic luxury real estate reveal, smooth slow dolly push-in toward the building facade, warm architectural lighting, professional real estate cinematography" |
| Living room | "Slow graceful camera glide across a bright luxury living room, natural daylight, airy and serene, professional interior cinematography" |
| Kitchen | "Smooth slow tracking shot along a modern kitchen island, soft highlights on surfaces, clean and elegant" |
| Bedroom | "Gentle slow pan across a sophisticated bedroom, soft natural light, serene atmosphere" |
| Terrace / view | "Slow push-out onto a private terrace, golden hour light, sense of space and openness" |
| Closing | "Slow pull-back revealing the full space, warm light, aspirational luxury" |

Rules of thumb: one camera move per clip, avoid people (the model may invent them), and describe the room that is actually in the photo. The more the prompt contradicts the photo, the more the room drifts.

---

## 4. Lessons learned from the first run

1. **Match prompts to the photos.** I wrote prompts from assumed room types without viewing the photos. For an app, classify each photo first (a vision model can label "exterior / living / kitchen / bedroom / bath / terrace") and write the prompt from the label.
2. **Order the story.** Exterior first, then living areas, bedrooms, terrace, and a closing shot. Sort by room label, not by page order.
3. **Credits can run out mid-batch.** Check `balance` and the preflight cost first, and surface partial failures clearly.
4. **Output isn't always 16:9.** Our clips came back about 1100x800. Either request a matching aspect ratio, use source photos that are already 16:9, or use the blurred-fill approach above.
5. **Sandbox files are ephemeral.** The Higgsfield sandbox is discarded about 10 seconds after a call. Chain download, build, and upload in one command, or run it in the background and poll immediately.
6. **Download from the right network.** Direct downloads of the CDN result URLs failed with HTTP 403 from my local environment, but worked from inside Higgsfield's sandbox. In your own app, download from your server and test this early.
7. **Upload with `--upload-file`**, not `--data-binary @file`, and check the file exists first.
8. **Never reuse presigned URLs in logs or the UI.** They contain credentials.

---

## 5. Features to add for a production-grade app

| Feature | How |
|---|---|
| **Voiceover** | `generate_audio` / `generate_audio_batch` with a locked voice from `list_voices`; keep one voice for the whole video |
| **Background music** | `generate_audio` (music model) or a licensed library track; duck it under the voiceover with FFmpeg `sidechaincompress` |
| **Burned-in captions** | Higgsfield's `subtitles` workflow, or Whisper for timing plus FFmpeg subtitles |
| **Vertical cut (Reels/TikTok)** | Re-generate at `9:16`, or use `reframe` |
| **Upscale** | `upscale_video` for a 4K master |
| **More clips** | One clip per good photo, usually 8-12 for a full listing |
| **Start + end frame** | Some models accept `end_image` to move between two photos for smoother room-to-room transitions |
| **Branding** | Logo overlay with FFmpeg `overlay`, brand colors on cards |
| **Agent contact card** | Final card with phone, email, and QR code |
| **Cost estimate** | Call generation with `get_cost: true` per clip and sum before the user confirms |

---

## 6. Suggested app architecture

```
Frontend (web)
  - provide photos (see product-specification.md for intake)
  - reorder/remove photos, edit title/price/branding
  - show estimated cost, confirm
  - progress view, final video player and download

Backend API
  - POST /projects          -> create project from photos
  - POST /projects/:id/generate -> start the pipeline
  - GET  /projects/:id      -> status + result URL

Worker (queue: BullMQ, Celery, SQS, etc.)
  1. Read the project's photos from storage
  2. Vision classify photos, choose order and prompts
  3. Import photos to Higgsfield (media_import_url)
  4. Preflight cost, then generate_video_batch
  5. Poll jobs (jobs_wait or the equivalent status call)
  6. Download clips to your storage
  7. FFmpeg assemble (your own server or container)
  8. Upload final MP4 to your storage / CDN
  9. Notify the user

Storage: S3-compatible bucket for photos, clips, finals
Database: projects, photos, jobs (job_id, index, status, result_url), costs
```

**API access:** everything above was done through Higgsfield's MCP tools inside Claude. A standalone app needs programmatic access to Higgsfield. Check Higgsfield's developer documentation and your plan for API availability, authentication, rate limits, and commercial-use terms. The tool names in this guide map to those capabilities, but the exact endpoints may differ.

**Alternative:** keep Claude as the orchestrator and use Claude Code or the Claude Agent SDK with the Higgsfield MCP server connected. Your app then sends a prompt like "make a walkthrough video from these photos" and Claude runs the pipeline.

---

## 7. Cost model

From the first run:

| Item | Cost |
|---|---|
| One 5-second clip (`cinematic_studio_video_v2`) | 7.5 credits |
| Four clips | 30 credits |
| Title/end cards, FFmpeg assembly, upload | No Higgsfield credits |

A typical 10-clip listing is about 75 credits. Convert credits to USD using your plan's price and credit allowance, and always call the preflight (`get_cost`) rather than hard-coding prices, because they can change.

---

## 8. Quick checklist

- [ ] Permission to use the photos
- [ ] Photos collected (see product-specification.md) and classified by room
- [ ] Photos imported (`media_import_url`) to `media_id`s
- [ ] Cost preflight shown to the user and approved
- [ ] Clips generated in batch, failures retried by index
- [ ] All jobs `completed`
- [ ] Clips downloaded and normalized to 1920x1080 / 30 fps
- [ ] Title and end cards built from real listing data
- [ ] Crossfades and fade-out applied
- [ ] File decodes cleanly (`ffmpeg -v error -i final.mp4 -f null -`)
- [ ] Uploaded, confirmed, and link delivered
