import { apiRequest } from "@/services/api";
import type { RegisterFormData } from "@/modules/auth/register/schemas/register.schema";

type RegisterResponse = {
  id: string;
  name: string;
  email: string;
};

export const registerService = {
  create(data: RegisterFormData) {
    return apiRequest<RegisterResponse>("/auth/users/register", {
      method: "POST",
      auth: false,
      body: data,
    });
  },
};
