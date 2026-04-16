"use server";

import { revalidatePath } from "next/cache";
import { createUser as createUserService, updateUser as updateUserService, deleteUser as deleteUserService } from "../services/user.services";

export async function createUserAction(userData: {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
}) {
  try {
    const user = await createUserService(userData);
    revalidatePath("/dashboard/users"); // Revalidate the users page
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateUserAction(userData: {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: "ADMIN" | "MANAGER" | "CLIENT";
}) {
  try {
    const user = await updateUserService(userData);
    revalidatePath("/dashboard/users"); // Revalidate the users page
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

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