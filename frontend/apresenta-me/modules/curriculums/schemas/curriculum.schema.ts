import { z } from "zod";

export const curriculumSchema = z.object({
  full_name: z.string().min(2, "Informe o nome completo"),
  slug: z
    .string()
    .min(3, "Use no mínimo 3 caracteres")
    .max(100, "Use no máximo 100 caracteres")
    .regex(/^[a-zA-Z0-9-]+$/, "Use apenas letras, números e hífen"),
  headline: z.string().max(160, "Use no máximo 160 caracteres").optional().or(z.literal("")),
  about: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().max(2, "Use a sigla do estado").optional().or(z.literal("")),
  linkedin: z.string().url("Informe uma URL válida").optional().or(z.literal("")),
  github: z.string().url("Informe uma URL válida").optional().or(z.literal("")),
  portfolio: z.string().url("Informe uma URL válida").optional().or(z.literal("")),
});

export type CurriculumFormData = z.infer<typeof curriculumSchema>;
