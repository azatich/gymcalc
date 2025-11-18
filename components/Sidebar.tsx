import { getCurrentUser } from "@/lib/auth-actions";
import SidebarClient from "./SidebarClient";


export default async function Sidebar() {
  const user = await getCurrentUser();

  return <SidebarClient user={user} />;
}