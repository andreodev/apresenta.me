import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CurriculumFormData } from "@/modules/curriculums/schemas/curriculum.schema";
import { curriculumsService } from "@/modules/curriculums/services/curriculums.service";

export const curriculumsKeys = {
  all: ["curriculums"] as const,
  mine: () => [...curriculumsKeys.all, "me"] as const,
  detail: (id: string) => [...curriculumsKeys.all, id] as const,
};

export function useCurriculums() {
  return useQuery({
    queryKey: curriculumsKeys.mine(),
    queryFn: () => curriculumsService.listMine(),
  });
}

export function useCurriculum(id: string) {
  return useQuery({
    queryKey: curriculumsKeys.detail(id),
    queryFn: () => curriculumsService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateCurriculum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CurriculumFormData) => curriculumsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: curriculumsKeys.mine() });
    },
  });
}

export function useUpdateCurriculum(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CurriculumFormData) => curriculumsService.update(id, data),
    onSuccess: (curriculum) => {
      queryClient.setQueryData(curriculumsKeys.detail(id), curriculum);
      queryClient.invalidateQueries({ queryKey: curriculumsKeys.mine() });
    },
  });

 }

  export function useDeleteCurriculum() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => curriculumsService.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: curriculumsKeys.mine() });
      },
    });
  }
