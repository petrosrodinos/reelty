import type { Metadata } from "next";
import EditProjectPage from "@/views/projects/edit";

export const metadata: Metadata = { title: "Prepare your photos" };

export default async function Page(props: PageProps<"/projects/[id]/edit">) {
  const { id } = await props.params;
  return <EditProjectPage id={id} />;
}
