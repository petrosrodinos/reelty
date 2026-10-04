"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/config/api/axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProject } from "@/features/projects/hooks/use-projects";
import { SourceTypes } from "@/features/projects/interfaces/projects.interfaces";
import {
  airbnbLinkSchema,
  websiteLinkSchema,
  type WebsiteLinkFormData,
} from "@/features/projects/validation-schemas/projects.schema";
import { Routes } from "@/routes/routes";

interface LinkIntakeFormProps {
  kind: typeof SourceTypes.WEBSITE | typeof SourceTypes.AIRBNB;
}

const copy = {
  [SourceTypes.WEBSITE]: {
    heading: "Paste a property listing link",
    body: "We will find the gallery photos on the page, skip logos and icons, and copy them to private storage.",
    label: "Listing URL",
    placeholder: "https://www.example-realty.com/listing/1042",
    hint: "Must start with http:// or https://. Only use listings you are authorised to promote.",
  },
  [SourceTypes.AIRBNB]: {
    heading: "Paste an Airbnb listing link",
    body: "Use a link to a single listing, like airbnb.com/rooms/20450071. Search result pages are not supported.",
    label: "Airbnb listing URL",
    placeholder: "https://www.airbnb.com/rooms/20450071",
    hint: "Tracking parameters are removed for you.",
  },
} as const;

export const LinkIntakeForm: FC<LinkIntakeFormProps> = ({ kind }) => {
  const router = useRouter();
  const createProject = useCreateProject();
  const text = copy[kind];

  const form = useForm<WebsiteLinkFormData>({
    resolver: zodResolver(kind === SourceTypes.AIRBNB ? airbnbLinkSchema : websiteLinkSchema),
    defaultValues: { source_url: "" },
  });

  const onSubmit = (values: WebsiteLinkFormData) => {
    createProject.mutate(
      { source_type: kind, source_url: values.source_url.trim() },
      {
        onSuccess: (project) => router.push(Routes.edit(project.id)),
        onError: (error) => {
          const message = error instanceof ApiError ? error.fields?.source_url : undefined;
          if (message) form.setError("source_url", { message });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <div>
          <h2 className="text-[1.375rem] font-medium leading-snug text-ink">{text.heading}</h2>
          <p className="mt-1 text-muted-foreground">{text.body}</p>
        </div>
        <FormField
          control={form.control}
          name="source_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{text.label}</FormLabel>
              <FormControl>
                <Input type="url" inputMode="url" autoComplete="off" placeholder={text.placeholder} {...field} />
              </FormControl>
              <FormDescription>{text.hint}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={createProject.isPending}>
            {createProject.isPending ? <Spinner /> : null}
            Fetch photos
          </Button>
        </div>
      </form>
    </Form>
  );
};
