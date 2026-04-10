import { authApi } from "@/api";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authData = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  try {
    const response = await authApi.post("login", authData);
    if (response.status !== 200) {
      return { error: response.data || "login Failed" };
    }
    let redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

    if (redirectTo === "/login") {
      redirectTo = "/";
    }
    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "login Failed" };
    } else throw error;
  }
};
