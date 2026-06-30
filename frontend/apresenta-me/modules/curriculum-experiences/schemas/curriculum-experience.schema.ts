import { z } from "zod";

export const curriculumExperienceSchema = z.object({
  company: z.string().min(2, "Informe a empresa"),
  position: z.string().min(2, "Informe o cargo"),
  start_date: z.string().min(1, "Informe a data de início"),
  end_date: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export type CurriculumExperienceFormData = z.infer<typeof curriculumExperienceSchema>;
