import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";

const FormSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "your one-time password must be 6 characters" }),
});

export function OtpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      otp: "",
    },
  });

  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const isSubmitting = navigation.state === "submitting";

  function onSubmit(values: z.infer<typeof FormSchema>) {
    submit(values, { method: "post", action: "/register/otp" });
  }

  return (
    <Card className="mx-auto max-w-full  border-0 shadow-none">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your phone number:{" "}
          <span className="font-medium">....</span>.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex items-center justify-between mt-4 mb-4">
              <FormLabel htmlFor="otp-verification">
                Verification code
              </FormLabel>

              {/* <Button variant="outline" size="sm" type="button">
                <RefreshCwIcon />
                Resend Code
              </Button> */}
            </div>

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>

                      <InputOTPSeparator />

                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormDescription className="mt-6">
              <Link to="/register" className="hover:underline ">
                I no longer have access to this Phone number.
              </Link>
            </FormDescription>
          </CardContent>

          {actionData && (
            <p className="text-md text-red-500 "> {actionData.message}</p>
          )}

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              {isSubmitting ? "Verifying ...." : "Verify"}
            </Button>

            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{""}
              <a className="underline underline-offset-4 hover:text-primary">
                Contact support
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
