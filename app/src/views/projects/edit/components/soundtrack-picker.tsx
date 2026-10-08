"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Soundtrack } from "@/features/projects/interfaces/projects.interfaces";

interface SoundtrackPickerProps {
  tracks: Soundtrack[];
  value: string;
  disabled?: boolean;
  onChange: (id: string) => void;
}

/** Previews are the same CC0 files the renderer uses, copied to `public/soundtracks`. */
const previewSrc = (id: string) => `/soundtracks/${id}.mp3`;

export const SoundtrackPicker: FC<SoundtrackPickerProps> = ({ tracks, value, disabled, onChange }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const selected = tracks.find((track) => track.id === value);

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
  };

  // Stop playback when leaving the page.
  useEffect(() => stop, []);

  const togglePlay = () => {
    if (playing) return stop();
    const audio = new Audio(previewSrc(value));
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("error", () => setPlaying(false));
    audioRef.current = audio;
    audio.play().then(() => setPlaying(true), () => setPlaying(false));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Select
          value={value}
          items={tracks.map((track) => ({ value: track.id, label: track.name }))}
          disabled={disabled}
          onValueChange={(id) => {
            stop();
            onChange(id as string);
          }}
        >
          <SelectTrigger aria-label="Soundtrack" className="h-10 min-w-0 flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track.id} value={track.id}>
                {track.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10 shrink-0"
          aria-label={playing ? "Stop preview" : "Play preview"}
          onClick={togglePlay}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
      {selected ? <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{selected.description}</p> : null}
    </div>
  );
};
