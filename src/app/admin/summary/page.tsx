// import { getUsersWithUploads } from "~/lib/queries/uploads";

import AdminPageClient from "./page.client";

export default async function AdminPage() {
  // const data = await getUsersWithUploads();
  const data: any[] = []; // Placeholder for the actual data fetching logic
  return <AdminPageClient initialData={data} />;
}
