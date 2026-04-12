import { Link, useActionData, useNavigation, useSubmit } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "./Password-Input";

const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(12, "Phone number is too long")
    .regex(/^\d+$/, "Phone number must be numbers"),

  password: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
});

export default function LoginForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    submit(values, { method: "post", action: "/login" }); //action in routes ==> action file ==>login Action
  }
  return (
    <Card className="mx-auto w-full max-w-md shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
        <CardDescription>Enter your phone number to login</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 rounded-lg"
                      type="tel"
                      placeholder="0977********"
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/reset"
                      className="ml-auto text-sm text-muted-foreground hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>

                  <FormControl>
                    <PasswordInput
                      className="h-11 rounded-lg"
                      inputMode="numeric"
                      {...field}
                      required
                    ></PasswordInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {actionData && (
              <p className="text-md text-red-600 items-center justify-center">
                {actionData.message}
              </p>
            )}

            <div className="space-y-3">
              <Button type="submit" className="w-full h-11 rounded-lg">
                {isSubmitting ? "Signing In ...." : " Sign In"}
              </Button>

              <div className="relative text-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                <div className="absolute inset-0 top-1/2 border-t" />
              </div>

              <Button variant="outline" className="w-full h-11 rounded-lg">
                Sign in with Google
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
