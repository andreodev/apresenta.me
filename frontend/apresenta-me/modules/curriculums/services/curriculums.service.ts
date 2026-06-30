import { apiRequest } from "@/services/api";
import type { CurriculumFormData } from "@/modules/curriculums/schemas/curriculum.schema";
import type { Curriculum } from "@/modules/curriculums/types/curriculum.types";

export const curriculumsService = {
  listMine() {
    return apiRequest<Curriculum[]>("/curriculums/me");
  },

  getById(id: string) {
    return apiRequest<Curriculum>(`/curriculums/${id}`);
  },

  async create(data: CurriculumFormData) {
    return apiRequest<Curriculum>("/curriculums/create", {
      method: "POST",
      // O backend lê o user_id pelo JWT enviado no header Authorization.
      // Assim o formulário envia apenas os campos que o usuário realmente edita.
      body: data,
    });
  },

  async update(id: string, data: CurriculumFormData) {
    return apiRequest<Curriculum>(`/curriculums/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  delete(id: string) {
    return apiRequest<void>(`/curriculums/${id}`, {
      method: "DELETE",
    });
  }
};
