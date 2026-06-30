"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateExperience,
  useExperiences,
} from "@/modules/curriculum-experiences/hooks/use-experiences";
import {
  type CurriculumExperienceFormData,
  curriculumExperienceSchema,
} from "@/modules/curriculum-experiences/schemas/curriculum-experience.schema";
import type { CurriculumExperience } from "@/modules/curriculum-experiences/types/curriculum-experience.types";

export function ExperiencesPanel({ curriculumId }: { curriculumId: string }) {
  const { data, isLoading, isError, error } = useExperiences(curriculumId);
  const createExperience = useCreateExperience(curriculumId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CurriculumExperienceFormData>({
    resolver: zodResolver(curriculumExperienceSchema),
    defaultValues: {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  });

  async function onSubmit(data: CurriculumExperienceFormData) {
    try {
      await createExperience.mutateAsync(data);
      reset();
      toast.success("Experiência adicionada com sucesso");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível adicionar a experiência",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
      <section className="rounded-lg border bg-background p-6">
        <div className="mb-5 flex items-center gap-2">
          <Plus className="size-4" />
          <h2 className="text-lg font-medium">Nova experiência</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Field label="Empresa" error={errors.company?.message}>
            <Input {...register("company")} />
          </Field>
          <Field label="Cargo" error={errors.position?.message}>
            <Input {...register("position")} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Data início" error={errors.start_date?.message}>
              <Input type="date" {...register("start_date")} />
            </Field>
            <Field label="Data fim" error={errors.end_date?.message}>
              <Input type="date" {...register("end_date")} />
            </Field>
          </div>
          <Field label="Descrição" error={errors.description?.message}>
            <Textarea {...register("description")} />
          </Field>
          <Button
            type="submit"
            disabled={createExperience.isPending}
            className="w-full"
          >
            {createExperience.isPending
              ? "Adicionando..."
              : "Adicionar experiência"}
          </Button>
        </form>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Não foi possível carregar as experiências"}
          </div>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
            Nenhuma experiência cadastrada.
          </div>
        )}

        {data?.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </section>
    </div>
  );
}

function ExperienceItem({ experience }: { experience: CurriculumExperience }) {
  return (
    <article className="rounded-lg border bg-background p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-medium">{experience.company}</h3>
          <p className="mt-1 text-sm text-foreground">{experience.position}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatMonthYear(experience.start_date)} -{" "}
            {experience.end_date
              ? formatMonthYear(experience.end_date)
              : "Atual"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>
            <Pencil className="size-4" />
            Editar
          </Button>
          <Button variant="destructive" size="sm" disabled>
            <Trash2 className="size-4" />
            Excluir
          </Button>
        </div>
      </div>
      {experience.description && (
        <p className="mt-4 whitespace-pre-line text-sm text-muted-foreground">
          {experience.description}
        </p>
      )}
    </article>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function formatMonthYear(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(date)
    .replace(".", "");
}
