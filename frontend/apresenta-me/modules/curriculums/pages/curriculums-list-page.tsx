"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCurriculums, useDeleteCurriculum } from "../hooks/use-curriculums";
import { CurriculumCard } from "../components/curriculum-card";
import { CurriculumListSkeleton } from "../components/curriculum-skeleton";

export default function CurriculumsListPage() {
  const { data, isLoading, isError, error } = useCurriculums();
  const deleteCurriculum = useDeleteCurriculum();

  const handleDeleteCurriculum = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este currículo?")) {
      deleteCurriculum.mutate(id);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Meus Currículos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie seus currículos digitais e mantenha suas experiências
            atualizadas.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/curriculums/new">
            <Plus className="size-4" />
            Novo currículo
          </Link>
        </Button>
      </div>

      {isLoading && <CurriculumListSkeleton />}

      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Não foi possível carregar os currículos"}
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div className="rounded-lg border bg-background p-8 text-center">
          <h2 className="text-lg font-medium">Nenhum currículo criado</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece criando seu primeiro currículo.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((curriculum) => (
          <CurriculumCard
            key={curriculum.id}
            curriculum={curriculum}
            onDelete={handleDeleteCurriculum}
            isDeleting={false}
          />
        ))}
      </div>
    </div>
  );
}
