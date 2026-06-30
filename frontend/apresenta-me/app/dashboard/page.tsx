import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe seus currículos e continue configurando sua apresentação profissional.
        </p>
      </div>

      <section className="rounded-lg border bg-background p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium">Meus Currículos</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Crie, edite dados e adicione experiências profissionais.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/curriculums">Abrir currículos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
