import { airbnbListingVideo } from "@/views/guides/data/guides";
import { GuidePage, guideMetadata } from "@/views/guides/guide-page";

export const metadata = guideMetadata(airbnbListingVideo);

export default function Page() {
  return <GuidePage guide={airbnbListingVideo} />;
}
