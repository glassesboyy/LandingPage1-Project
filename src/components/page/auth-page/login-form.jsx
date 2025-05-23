"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm({ className, ...props }) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Login to your account</h1>
        <p className="text-white/70 text-sm text-balance font-light">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-white/90">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email..."
            required
            className="bg-black/40 border-violet-900/30 text-white placeholder:text-white/50 focus:border-violet-500"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/90">
              Password
            </Label>
            <Link
              href="#"
              className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password..."
            required
            className="bg-black/40 border-violet-900/30 text-white focus:border-violet-500"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-colors cursor-pointer"
        >
          Login
        </Button>
        <div className="relative text-center text-sm">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-violet-900/30"></div>
          </div>
          <span className="relative z-10 bg-black px-2 text-white/50 text-sm">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full border-violet-900/30 text-white hover:text-white hover:bg-violet-900/20 bg-black cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-2"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-white/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-violet-400 hover:text-violet-300 transition-colors"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
