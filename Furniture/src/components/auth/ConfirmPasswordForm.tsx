import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import { Icons } from "../icons";
import { PasswordInput } from "./Password-Input";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be 8 digits.")
      .max(8, "Password must be 8 digits.")
      .regex(/^\d+$/, "Password must be numbers"),

    confirmpassword: z
      .string()
      .min(8, "Password must be 8 digits.")
      .max(8, "Password must be 8 digits.")
      .regex(/^\d+$/, "Password must be numbers"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
      password: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    submit(values, { method: "post", action: "/register/confirm-password" });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link to="" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Icons.logo className="mr-2 size-6"></Icons.logo>
            </div>
            <span className="sr-only">Confirm Password</span>
          </Link>
          <h1 className="text-xl font-bold">Please Confirm your Password</h1>
          <FieldDescription>
            Passwords must be 8 digits long and contain only numbers.
          </FieldDescription>
        </div>

        <Form {...form}>
          <form
            className="space-y-5"
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="h-11 rounded-lg"
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
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="h-11 rounded-lg"
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {actionData && (
              <p className="text-md text-red-500 "> {actionData.message}</p>
            )}

            <div className="space-y-3">
              <Button type="submit" className="w-full h-11 rounded-lg">
                {isSubmitting ? "Loading ....." : "Confirm"}
              </Button>
            </div>
          </form>
        </Form>
      </FieldGroup>
    </div>
  );
}
