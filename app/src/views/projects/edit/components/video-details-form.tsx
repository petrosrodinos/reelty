"use client";

import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useSoundtracks, useUpdateProject } from "@/features/projects/hooks/use-projects";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import type { VideoDetailsFormData } from "@/features/projects/validation-schemas/projects.schema";
import { VideoLimits } from "@/lib/format.utils";

interface VideoDetailsFormProps {
  project: Project;
  form: UseFormReturn<VideoDetailsFormData>;
}

export const VideoDetailsForm: FC<VideoDetailsFormProps> = ({ project, form }) => {
  const updateProject = useUpdateProject();
  const { data: soundtracks } = useSoundtracks();
  const titleLength = form.watch("title").length;

  return (
    <section className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6" aria-labelledby="details-heading">
      <h2 id="details-heading" className="mb-4 text-lg font-medium text-ink">
        Video details
      </h2>
      <Form {...form}>
        <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-4" noValidate>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input maxLength={VideoLimits.maxTitle} placeholder="Sunlit Loft in Plaka" autoComplete="off" {...field} />
                </FormControl>
                <div className="flex justify-between gap-3">
                  <FormMessage />
                  <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                    {titleLength}/{VideoLimits.maxTitle}
                  </span>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input maxLength={VideoLimits.maxSubtitle} placeholder="87 m² | 40 m² terrace" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location or price line</FormLabel>
                <FormControl>
                  <Input maxLength={VideoLimits.maxLocationLine} placeholder="Athens · €450,000" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="closing_line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing line</FormLabel>
                <FormControl>
                  <Input maxLength={VideoLimits.maxClosingLine} placeholder="Agent name, website, phone" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-5 border-t border-hairline-soft pt-5">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="music-switch" className="text-sm font-medium text-ink">
            Music
          </Label>
          <Switch
            id="music-switch"
            checked={project.music_enabled}
            disabled={updateProject.isPending}
            onCheckedChange={(checked) => updateProject.mutate({ id: project.id, dto: { music_enabled: checked } })}
          />
        </div>
        <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
          {project.music_enabled
            ? "Pick a built-in royalty-free track. It fades in and out."
            : "No music. A silent audio track keeps the file compatible everywhere."}
        </p>
        {project.music_enabled && soundtracks ? (
          <RadioGroup
            aria-label="Soundtrack"
            className="mt-3"
            value={project.soundtrack_id}
            disabled={updateProject.isPending}
            onValueChange={(value) =>
              value !== project.soundtrack_id &&
              updateProject.mutate({ id: project.id, dto: { soundtrack_id: String(value) } })
            }
          >
            {soundtracks.map((track) => (
              <Label
                key={track.id}
                htmlFor={`soundtrack-${track.id}`}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-hairline p-3 has-data-checked:border-primary"
              >
                <RadioGroupItem id={`soundtrack-${track.id}`} value={track.id} className="mt-0.5" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink">{track.name}</span>
                  <span className="text-[0.8125rem] font-normal text-muted-foreground">{track.description}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
        ) : null}
      </div>
    </section>
  );
};
