import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
        <CardDescription>
          Enter your phone number to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          {/* PHONE */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              placeholder="0977********"
              className="w-full"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>

          {/* SUBMIT */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          {/* GOOGLE */}
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
