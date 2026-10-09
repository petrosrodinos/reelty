import { realEstateListingVideo } from "@/views/guides/data/guides";
import { GuidePage, guideMetadata } from "@/views/guides/guide-page";

export const metadata = guideMetadata(realEstateListingVideo);

export default function Page() {
  return <GuidePage guide={realEstateListingVideo} />;
}
