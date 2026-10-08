"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProject } from "@/features/projects/hooks/use-projects";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { videoDetailsSchema, type VideoDetailsFormData } from "@/features/projects/validation-schemas/projects.schema";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

export type SaveState = "saved" | "saving" | "error";

const AUTOSAVE_DELAY_MS = 800;

const toFormValues = (project: Project): VideoDetailsFormData => ({
  title: project.title ?? "",
  subtitle: project.subtitle ?? "",
  location_line: project.location_line ?? "",
  closing_line: project.closing_line ?? "",
});

/**
 * Video details form with debounced autosave (spec 11.2). UI state only: the PATCH goes through the
 * feature mutation. `flush()` must be awaited before submitting so the server has the latest title.
 */
export function useVideoDetailsAutosave(project: Project) {
  const form = useForm<VideoDetailsFormData>({
    resolver: zodResolver(videoDetailsSchema),
    defaultValues: toFormValues(project),
    mode: "onChange",
  });
  const update = useUpdateProject({ silent: true });
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const dirtyRef = useRef(false);
  const projectId = project.id;
  const { mutateAsync } = update;

  const save = useCallback(async () => {
    const values = form.getValues();
    if (!videoDetailsSchema.safeParse(values).success) return;
    const title = values.title.trim();
    setSaveState("saving");
    try {
      await mutateAsync({
        id: projectId,
        dto: {
          title,
          subtitle: values.subtitle.trim(),
          location_line: values.location_line.trim(),
          closing_line: values.closing_line.trim(),
        },
      });
      dirtyRef.current = false;
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, [form, mutateAsync, projectId]);

  const { debounced, cancel } = useDebouncedCallback(save, AUTOSAVE_DELAY_MS);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library -- subscription callback form of watch is safe here
    const subscription = form.watch((_values, { type }) => {
      if (type !== "change") return;
      dirtyRef.current = true;
      setSaveState("saving");
      debounced();
    });
    return () => subscription.unsubscribe();
  }, [form, debounced]);

  const flush = useCallback(async () => {
    cancel();
    if (dirtyRef.current) await save();
  }, [cancel, save]);

  const title = useWatch({ control: form.control, name: "title" });

  return { form, saveState, flush, retrySave: save, title };
}
