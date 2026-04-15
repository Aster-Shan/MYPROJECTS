import api, { authApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  //{request}:ActionFunctionArgs only for data
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("login", credentials);
    if (response.status !== 200) {
      return { error: response.data || "login Failed" };
    }

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

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("register", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Sending OTP Failed" };
    }
    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP Failed" };
    } else throw error;
  }
};
export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };
  try {
    const response = await authApi.post("verify-otp", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Verifying OTP Failed" };
    }
    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP Failed" };
    } else throw error;
  }
};

export const confirmAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();
  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };
  try {
    const response = await authApi.post("confirm-password", credentials);
    if (response.status !== 200) {
      return { error: response.data || "Registration Failed" };
    }
    authStore.clearAuth();
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Registration Failed" };
    } else throw error;
  }
};
