"use server";

import { revalidatePath } from "next/cache";
import { deleteUser as deleteUserService } from "../services/user.services";

export async function deleteUserAction(userId: number) {
  try {
    await deleteUserService(userId);
    revalidatePath("/dashboard/users"); // Revalidate the users page
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}