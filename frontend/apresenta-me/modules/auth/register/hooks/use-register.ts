import { useMutation } from "@tanstack/react-query";

import type { RegisterFormData } from "@/modules/auth/register/schemas/register.schema";
import { registerService } from "@/modules/auth/register/services/register.service";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterFormData) => registerService.create(data),
  });
}
