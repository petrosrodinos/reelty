"use client";

import type { FC } from "react";
import { MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSendContactMessage } from "@/features/contact/hooks/use-contact";
import { contactSchema, type ContactFormData } from "@/features/contact/validation-schemas/contact.schema";

const ContactPage: FC = () => {
  const contact = useSendContactMessage();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactFormData) => contact.mutate(values, { onSuccess: () => form.reset() });

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <div className="page-container max-w-xl py-12 md:py-20">
          <p className="text-eyebrow text-muted-foreground">Contact</p>
          <h1 className="text-display-lg mt-3">Contact us</h1>
          <p className="mt-3 text-muted-foreground">
            Questions, feedback or a problem with a video? Send us a message and we will reply by email.
          </p>

          {contact.isSuccess ? (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-lg bg-surface-card px-4 py-10 text-center">
              <span className="grid size-12 place-items-center rounded-md bg-canvas text-brand">
                <MailCheckIcon className="size-6" aria-hidden="true" />
              </span>
              <p className="text-sm text-body">{contact.data.message}</p>
              <Button variant="outline" onClick={() => contact.reset()}>
                Send another message
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4" noValidate>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input autoComplete="name" placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" placeholder="you@agency.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="How can we help? Tell us a bit about your question or issue." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" disabled={contact.isPending}>
                  {contact.isPending ? <Spinner /> : null}
                  Send message
                </Button>
              </form>
            </Form>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default ContactPage;
