"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { InfoIcon, LinkIcon, UploadIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NewProjectTabFormOptions,
  NewProjectTabs,
  isNewProjectTab,
  type NewProjectTab,
} from "@/config/constants/dropdowns/projects/new-project-tab-form.options";
import { useMe } from "@/features/auth/hooks/use-auth";
import { SourceTypes } from "@/features/projects/interfaces/projects.interfaces";
import { QueryParams, Routes } from "@/routes/routes";
import { LinkIntakeForm } from "@/views/new/components/link-intake-form";
import { UploadIntakePanel } from "@/views/new/components/upload-intake-panel";

const tabIcons: Record<NewProjectTab, FC<{ className?: string }>> = {
  [NewProjectTabs.WEBSITE]: LinkIcon,
  [NewProjectTabs.AIRBNB]: AirbnbIcon,
  [NewProjectTabs.UPLOAD]: UploadIcon,
};

function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4c-2 0-3 2-4 4l-3 7c-1 3 1 5 3 5 2 0 3-1 4-2 1 1 2 2 4 2 2 0 4-2 3-5l-3-7c-1-2-2-4-4-4zm0 8a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}

const NewVideoPage: FC = () => {
  const requested = useSearchParams().get(QueryParams.tab);
  const [tab, setTab] = useState<NewProjectTab>(isNewProjectTab(requested) ? requested : NewProjectTabs.WEBSITE);
  const { data: me } = useMe();
  const outOfCredits = !!me && me.credits.balance <= 0;

  return (
    <div className="page-container max-w-3xl py-10 md:py-14">
      <p className="text-eyebrow text-muted-foreground">Step 1 of 3</p>
      <h1 className="text-display-lg mt-2">New video</h1>
      <p className="mt-2 text-muted-foreground">Start from a listing link or your own photos. You will pick and order the shots next.</p>

      {outOfCredits ? (
        <Alert className="mt-6 border-hairline bg-notice-warn">
          <InfoIcon aria-hidden="true" />
          <AlertDescription className="text-ink">
            You have no credits left, so you cannot create a video yet. You can still prepare a project, then{" "}
            <Link href={Routes.credits} className="font-medium underline underline-offset-4">
              buy credits
            </Link>{" "}
            to create it.
          </AlertDescription>
        </Alert>
      ) : null}

      <Tabs value={tab} onValueChange={(value) => setTab(value as NewProjectTab)} className="mt-8 gap-5">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0" aria-label="How do you want to add photos?">
          {NewProjectTabFormOptions.map((option) => {
            const Icon = tabIcons[option.id];
            return (
              <TabsTrigger
                key={option.id}
                value={option.id}
                className="h-11 flex-none gap-2 rounded-md px-4 text-sm text-muted-foreground hover:text-ink data-active:bg-surface-card data-active:text-ink data-active:shadow-none dark:data-active:bg-surface-card"
              >
                <Icon className="size-4" />
                {option.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="rounded-lg border border-hairline bg-canvas p-5 sm:p-8">
          <TabsContent value={NewProjectTabs.WEBSITE} className="text-base">
            <LinkIntakeForm kind={SourceTypes.WEBSITE} />
          </TabsContent>
          <TabsContent value={NewProjectTabs.AIRBNB} className="text-base">
            <LinkIntakeForm kind={SourceTypes.AIRBNB} />
          </TabsContent>
          <TabsContent value={NewProjectTabs.UPLOAD} className="text-base">
            <UploadIntakePanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default NewVideoPage;
