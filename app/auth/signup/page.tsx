"use client";

import { AuthRegisterForm } from "@/components/auth/auth-register-form";
import Link from "next/link";
import { NavBackButton } from "@/components/navigation/nav-back-button";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-between gap-20 h-full w-full sm:w-[20rem] text-xs text-app-text bg-app-bg transition-colors">
      {/* 1. Navigation Header Row */}
      <div className="flex flex-row justify-between items-baseline w-full select-none pt-2">
        <div className="">
          {/* Replaced the duplicate icon button with your unified back component */}
          <NavBackButton />
        </div>

        <div className="text-[11px] text-app-text/50 font-medium text-right">
          <span>
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="underline text-app-primary font-bold hover:opacity-80 transition-opacity"
            >
              Signin.
            </Link>
          </span>
        </div>
      </div>

      {/* 2. Registration Header & Form Canvas */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-app-text tracking-tight">
            {"Let's create you an account."}
          </h1>
          <p className="text-app-text/60 font-normal leading-relaxed">
            Fill out the fields with your information!
          </p>
        </div>

        <AuthRegisterForm />
      </div>

      {/* 3. Empty bottom balancer node preserves your exact flex split spacing */}
      <div></div>
    </div>
  );
}
