"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ExperiencesPanel } from "@/modules/curriculum-experiences/components/experiences-panel";
import { useExperiences } from "@/modules/curriculum-experiences/hooks/use-experiences";
import {
  AtsTemplate,
  toAtsTemplateCurriculum,
} from "@/modules/curriculums/components/templates/ats-template";
import { CurriculumForm } from "@/modules/curriculums/components/curriculum-form";
import {
  useCurriculum,
  useUpdateCurriculum,
} from "@/modules/curriculums/hooks/use-curriculums";
import type { Curriculum } from "@/modules/curriculums/types/curriculum.types";
import type { CurriculumFormData } from "@/modules/curriculums/schemas/curriculum.schema";

const tabs = [
  "Dados",
  "Experiências",
  "Preview ATS",
  "Projetos",
  "Educação",
  "Habilidades",
  "Certificações",
  "Vídeos",
  "Publicação",
] as const;

export default function EditCurriculumPage({
  curriculumId,
}: {
  curriculumId: string;
}) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "Dados";
  const { data, isLoading, isError, error } = useCurriculum(curriculumId);
  const updateCurriculum = useUpdateCurriculum(curriculumId);

  async function handleSubmit(formData: CurriculumFormData) {
    try {
      await updateCurriculum.mutateAsync(formData);
      toast.success("Currículo atualizado com sucesso");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o currículo",
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {data?.headline || data?.full_name || "Editar currículo"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data?.slug || "Carregando dados..."}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b pb-2">
        {tabs.map((tab) => {
          const enabled =
            tab === "Dados" || tab === "Experiências" || tab === "Preview ATS";
          const active = activeTab === tab;

          return (
            <Link
              key={tab}
              href={`/dashboard/curriculums/${curriculumId}?tab=${encodeURIComponent(tab)}`}
              aria-disabled={!enabled}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
                enabled && "hover:bg-muted hover:text-foreground",
                active &&
                  "bg-background text-foreground shadow-sm ring-1 ring-border",
                !enabled && "pointer-events-none opacity-45",
              )}
            >
              {tab}
            </Link>
          );
        })}
      </div>

      {isLoading && (
        <section className="rounded-lg border bg-background p-6">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="mt-5 h-24 w-full" />
          <Skeleton className="mt-5 h-9 w-40" />
        </section>
      )}

      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Não foi possível carregar o currículo"}
        </div>
      )}

      {!isLoading && !isError && activeTab === "Dados" && (
        <section className="rounded-lg border bg-background p-6">
          <CurriculumForm
            defaultValues={data}
            submitLabel="Salvar dados"
            showPreview
            isSubmitting={updateCurriculum.isPending}
            onSubmit={handleSubmit}
          />
        </section>
      )}

      {!isLoading && !isError && activeTab === "Experiências" && (
        <ExperiencesPanel curriculumId={curriculumId} />
      )}

      {!isLoading && !isError && activeTab === "Preview ATS" && data && (
        <AtsPreviewPanel curriculumId={curriculumId} curriculum={data} />
      )}
    </div>
  );
}

function AtsPreviewPanel({
  curriculumId,
  curriculum,
}: {
  curriculumId: string;
  curriculum: Curriculum;
}) {
  const { data: experiences, isLoading } = useExperiences(curriculumId);
  const atsCurriculum = toAtsTemplateCurriculum(curriculum, experiences);

  return (
    <section className="rounded-lg border bg-muted/40 p-4 md:p-8">
      {isLoading ? (
        <div className="mx-auto w-full max-w-[794px]">
          <Skeleton className="h-[720px] w-full" />
        </div>
      ) : (
        <AtsTemplate curriculum={atsCurriculum} />
      )}
    </section>
  );
}
