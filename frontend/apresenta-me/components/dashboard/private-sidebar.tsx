"use client";

import { FileText, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/curriculums", label: "Meus Currículos", icon: FileText },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function PrivateSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-svh w-full flex-col border-b bg-background px-4 py-4 md:w-64 md:border-b-0 md:border-r">
      <Link href="/dashboard" className="mb-6 text-lg font-semibold tracking-tight">
        Apresenta.me
      </Link>
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                active && "bg-muted text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Button
        type="button"
        variant="ghost"
        className="mt-4 justify-start md:mt-auto"
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
      >
        <LogOut className="size-4" />
        Sair
      </Button>
    </aside>
  );
}
