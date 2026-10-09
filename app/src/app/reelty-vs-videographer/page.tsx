import { reeltyVsVideographer } from "@/views/guides/data/guides";
import { GuidePage, guideMetadata } from "@/views/guides/guide-page";

export const metadata = guideMetadata(reeltyVsVideographer);

export default function Page() {
  return <GuidePage guide={reeltyVsVideographer} />;
}
