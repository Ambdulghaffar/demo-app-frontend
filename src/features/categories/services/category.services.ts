import { PageResponse } from "@/types/pagination.types";
import { CategoryResDto } from "../types/category.types";
import apiClient from "@/lib/axios/api-client";
import { CATEGORIES_ENDPOINTS } from "../constants/categories.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";

export const getAllCategories = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "desc",
  search?: string,
): Promise<PageResponse<CategoryResDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<CategoryResDto>>(
      CATEGORIES_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          sortBy,
          sortDir,
          ...(search && search !== "" && { search }),
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
