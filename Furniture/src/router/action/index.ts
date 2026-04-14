import api, { authApi } from "@/api";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  //{request}:ActionFunctionArgs only for data
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  // const authData = {
  //   phone: formData.get("phone"),
  //   password: formData.get("password"),
  // };

  try {
    const response = await authApi.post("login", credentials);
    if (response.status !== 200) {
      return { error: response.data || "login Failed" };
    }

    // await fetch(import.meta.env.VITE_API_URL + "login", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    //   credentials: "include",
    // });

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "login Failed" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    console.error("logout failed", error);
  }
};
// export const verifyOTP = async ({ request }: ActionFunctionArgs) => {

// };

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("register", credentials);
    if (response.status !== 200) {
      return { error: response.data || "sending OTP Failed" };
    }
    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "register Failed" };
    } else throw error;
  }
};
