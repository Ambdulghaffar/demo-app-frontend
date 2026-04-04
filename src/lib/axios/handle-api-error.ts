import axios from "axios";
import { ApiError } from "@/types/api.types";

export const handleApiError = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? `Erreur: ${context}`;
    throw new ApiError(message, status);
  }
  throw new ApiError(`Erreur inattendue: ${context}`);
};