import { apiRequest } from "@/services/api";
import type { CurriculumExperienceFormData } from "@/modules/curriculum-experiences/schemas/curriculum-experience.schema";
import type { CurriculumExperience } from "@/modules/curriculum-experiences/types/curriculum-experience.types";

export const curriculumExperiencesService = {
  listByCurriculum(curriculumId: string) {
    return apiRequest<CurriculumExperience[]>(
      `/experiences/curriculum/${curriculumId}`
    );
  },

  create(curriculumId: string, data: CurriculumExperienceFormData) {
    return apiRequest<CurriculumExperience>("/experiences/create", {
      method: "POST",
      body: {
        curriculum_id: curriculumId,
        ...data,
      },
    });
  },
};
