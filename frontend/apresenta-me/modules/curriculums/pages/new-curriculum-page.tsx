"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CurriculumForm } from "@/modules/curriculums/components/curriculum-form";
import { useCreateCurriculum } from "@/modules/curriculums/hooks/use-curriculums";
import type { CurriculumFormData } from "@/modules/curriculums/schemas/curriculum.schema";

export default function NewCurriculumPage() {
  const router = useRouter();
  const createCurriculum = useCreateCurriculum();

  async function handleSubmit(data: CurriculumFormData) {
    try {
      const curriculum = await createCurriculum.mutateAsync(data);
      toast.success("Currículo criado com sucesso");
      router.push(`/dashboard/curriculums/${curriculum.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível criar o currículo");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Novo currículo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os dados principais para criar seu currículo digital.
        </p>
      </div>
      <section className="rounded-lg border bg-background p-6">
        <CurriculumForm
          submitLabel="Salvar currículo"
          showPreview
          isSubmitting={createCurriculum.isPending}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
