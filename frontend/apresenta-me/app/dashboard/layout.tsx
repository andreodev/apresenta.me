import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { PrivateSidebar } from "@/components/dashboard/private-sidebar";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-svh bg-muted/30 md:flex">
      <PrivateSidebar />
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
