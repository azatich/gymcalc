import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-actions";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Войти</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              type="submit"
              variant="outline"
              formAction={login}
              className="w-full"
            >
              Login
            </Button>
            <div className="flex items-center gap-2">
              <span className="block flex-1 h-px w-5 bg-black"></span>
              <span className="text-center">или</span>
              <span className="block flex-1 h-px w-5 bg-black"></span>
            </div>
            <SignInWithGoogleButton />
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Нету аккаунта? {" "}
          <Link href="/signup" className="underline">
            Регистрация
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
