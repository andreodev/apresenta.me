import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CurriculumExperienceFormData } from "@/modules/curriculum-experiences/schemas/curriculum-experience.schema";
import { curriculumExperiencesService } from "@/modules/curriculum-experiences/services/curriculum-experiences.service";

export const experiencesKeys = {
  all: ["curriculum-experiences"] as const,
  byCurriculum: (curriculumId: string) =>
    [...experiencesKeys.all, "curriculum", curriculumId] as const,
};

export function useExperiences(curriculumId: string) {
  console.log(curriculumId, "curriculumId");
  return useQuery({
    queryKey: experiencesKeys.byCurriculum(curriculumId),
    queryFn: () => curriculumExperiencesService.listByCurriculum(curriculumId),
    enabled: Boolean(curriculumId),
  });
}


export function useCreateExperience(curriculumId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CurriculumExperienceFormData) =>
      curriculumExperiencesService.create(curriculumId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: experiencesKeys.byCurriculum(curriculumId),
      });
    },
  });
}
