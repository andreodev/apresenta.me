"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AtsTemplate } from "@/modules/curriculums/components/templates/ats-template";
import {
  type CurriculumFormData,
  curriculumSchema,
} from "@/modules/curriculums/schemas/curriculum.schema";
import type { Curriculum } from "@/modules/curriculums/types/curriculum.types";

type CurriculumFormProps = {
  defaultValues?: Curriculum;
  isSubmitting?: boolean;
  showPreview?: boolean;
  submitLabel: string;
  onSubmit: (data: CurriculumFormData) => void;
};

const emptyValues: CurriculumFormData = {
  full_name: "",
  slug: "",
  headline: "",
  about: "",
  phone: "",
  city: "",
  state: "",
  linkedin: "",
  github: "",
  portfolio: "",
};

export function CurriculumForm({
  defaultValues,
  isSubmitting,
  showPreview,
  submitLabel,
  onSubmit,
}: CurriculumFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CurriculumFormData>({
    resolver: zodResolver(curriculumSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        full_name: defaultValues.full_name ?? "",
        slug: defaultValues.slug ?? "",
        headline: defaultValues.headline ?? "",
        about: defaultValues.about ?? "",
        phone: defaultValues.phone ?? "",
        city: defaultValues.city ?? "",
        state: defaultValues.state ?? "",
        linkedin: defaultValues.linkedin ?? "",
        github: defaultValues.github ?? "",
        portfolio: defaultValues.portfolio ?? "",
      });
    }
  }, [defaultValues, reset]);

  const previewValues = useWatch({ control });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nome Completo" error={errors.full_name?.message}>
            <Input {...register("full_name")} />
          </Field>
          <Field label="Slug" error={errors.slug?.message}>
            <Input {...register("slug")} placeholder="andreo-fullstack" />
          </Field>
        </div>

        <Field label="Headline" error={errors.headline?.message}>
          <Input {...register("headline")} placeholder="Frontend Developer" />
        </Field>

        <Field label="Sobre" error={errors.about?.message}>
          <Textarea {...register("about")} />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Telefone" error={errors.phone?.message}>
            <Input {...register("phone")} />
          </Field>
          <Field label="Cidade" error={errors.city?.message}>
            <Input {...register("city")} />
          </Field>
          <Field label="Estado" error={errors.state?.message}>
            <Input {...register("state")} maxLength={2} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Field label="LinkedIn" error={errors.linkedin?.message}>
            <Input
              {...register("linkedin")}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>
          <Field label="GitHub" error={errors.github?.message}>
            <Input
              {...register("github")}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field label="Portfólio" error={errors.portfolio?.message}>
            <Input {...register("portfolio")} placeholder="https://..." />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : submitLabel}
          </Button>
        </div>
      </div>

      {showPreview && (
        <div className="overflow-x-auto rounded-lg border bg-muted/40 p-3">
          <div className="origin-top-left scale-[0.49] sm:scale-[0.52] xl:scale-[0.5]">
            <AtsTemplate curriculum={toPreviewCurriculum(previewValues)} />
          </div>
        </div>
      )}
    </form>
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

function toPreviewCurriculum(values: Partial<CurriculumFormData>) {
  return {
    full_name: values.full_name ?? "",
    headline: values.headline,
    about: values.about,
    phone: values.phone,
    city: values.city,
    state: values.state,
    linkedin_url: values.linkedin,
    github_url: values.github,
    portfolio_url: values.portfolio,
  };
}
