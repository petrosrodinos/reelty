import type { FC } from "react";
import Link from "next/link";
import { Routes } from "@/routes/routes";
import { LegalLayout, LegalList, LegalSection } from "@/views/legal/components/legal-layout";

const PrivacyPage: FC = () => (
  <LegalLayout title="Privacy Policy" updated="4 October 2026">
    <LegalSection heading="1. What we collect">
      <LegalList
        items={[
          "Account data: your email address and a salted hash of your password (we never store the password itself).",
          "Content you provide: photos you upload or that we copy from a listing link, video details such as title and closing line, and the consent confirmations you give.",
          "Generated files: the videos, poster frames and edited photos we create for you.",
          "Technical data: IP address and browser details for security, rate limiting and abuse prevention.",
        ]}
      />
    </LegalSection>

    <LegalSection heading="2. How we use it">
      <p>
        To run the service: create your videos, send transactional emails (verification, password reset, video ready or failed),
        keep your account secure, and track your credit balance and purchases. We do not sell your data and we do not use advertising trackers.
      </p>
    </LegalSection>

    <LegalSection heading="3. Who processes it">
      <p>We rely on these processors to deliver the service. Each only receives what its task needs.</p>
      <LegalList
        items={[
          <span key="gcp"><strong>Google Cloud</strong>: private storage for photos and videos, and hosting.</span>,
          <span key="apify"><strong>Apify</strong>: reads the public listing page you give us to find its photos.</span>,
          <span key="dewatermark"><strong>Dewatermark</strong>: edits an individual photo only when you click Remove watermark.</span>,
          <span key="higgsfield"><strong>Higgsfield</strong>: generates video clips from your photos.</span>,
          <span key="email"><strong>Our email provider</strong>: delivers account and status emails.</span>,
          <span key="stripe"><strong>Stripe</strong>: processes credit purchases. Card details go to Stripe directly and never reach our servers.</span>,
        ]}
      />
    </LegalSection>

    <LegalSection heading="4. Cookies">
      <p>
        We use essential cookies only: a short-lived access cookie, a rotating refresh cookie and a CSRF token that together keep
        you signed in and protect your session. There are no advertising or analytics cookies.
      </p>
    </LegalSection>

    <LegalSection heading="5. Retention and deletion">
      <p>
        Projects and videos stay until you delete them. Deleting a project removes its video, poster and every photo from our
        storage. Deleting your account removes your whole storage area. You can ask us to export or erase your data at any time.
      </p>
    </LegalSection>

    <LegalSection heading="6. Your rights">
      <p>
        Depending on where you live you may have the right to access, correct, export or delete your data, and to object to
        processing. Contact us and we will respond within a reasonable time. A named contact address will be added here before
        launch.
      </p>
    </LegalSection>

    <p className="text-sm text-muted-foreground">
      See also our{" "}
      <Link href={Routes.terms} className="font-medium text-primary underline-offset-4 hover:underline">
        Terms of Service
      </Link>
      .
    </p>
  </LegalLayout>
);

export default PrivacyPage;
