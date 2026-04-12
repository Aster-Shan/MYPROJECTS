import api, { authApi } from "@/api";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const response = await api.get("users/products");
    return response.data;
  } catch (error) {
    console.log("HomeLoader eror:", error);
    throw error;
  }
};
export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    return redirect("/");
    if (response.status !== 200) {
      return null;
    }
  } catch (error) {
    console.log("Loader eror:", error);
  }
};
