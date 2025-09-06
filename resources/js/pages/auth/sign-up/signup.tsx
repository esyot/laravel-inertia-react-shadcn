"use client";
import * as React from "react";
import { router, useForm, usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";
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
import {
    Zap,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [step, setStep] = React.useState<"code" | "register">("code");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [codeVerified, setCodeVerified] = React.useState(false);

    const { data, setData, post, processing, reset } = useForm({
        code: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { errors, flash }: any = usePage().props;

    function handleCodeSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/signup/verify-code", {
            onSuccess: () => {
                setCodeVerified(true);
                setTimeout(() => setStep("register"), 1500);
            },
            preserveScroll: true,
        });
    }

    function handleRegisterSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/signup", { preserveScroll: true });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full max-w-md mx-auto border-slate-200/70 shadow-xl">
                <CardHeader className="space-y-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-fit -ml-2 -mt-2 cursor-pointer"
                        onClick={() => router.visit("/signup")}
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <div className="flex justify-center w-full items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-md">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                Create your account
                            </CardTitle>
                            <CardDescription>
                                {step === "code"
                                    ? "Enter your customer code to continue"
                                    : "Complete your account details"}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {step === "code" ? (
                        <form className="space-y-4" onSubmit={handleCodeSubmit}>
                            {flash?.success && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                    <p className="text-sm">{flash.success}</p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="code">Customer Code</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                    placeholder="e.g. TUBI-POB-P1-ABCD"
                                    required
                                />
                                {errors.code && (
                                    <p className="text-sm text-red-500">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing || codeVerified}
                                className="w-full"
                            >
                                {codeVerified ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        Verified!
                                    </div>
                                ) : (
                                    "Verify Code"
                                )}
                            </Button>

                            {codeVerified && (
                                <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm border border-blue-200">
                                    Code verified successfully! Redirecting to
                                    registration form...
                                </div>
                            )}
                        </form>
                    ) : (
                        <form
                            className="space-y-4"
                            onSubmit={handleRegisterSubmit}
                        >
                            <div className="mb-2 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Code verified successfully
                                </p>
                                <p className="text-sm mt-1">
                                    Please complete your registration details
                                    below.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="verified-code">
                                    Customer Code
                                </Label>
                                <Input
                                    id="verified-code"
                                    value={data.code}
                                    disabled
                                    className="bg-slate-100 opacity-75 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-500">
                                    Your customer code has been verified and
                                    cannot be changed.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Your Name"
                                        required
                                        className="pl-9"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="you@company.com"
                                        required
                                        className="pl-9"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Password"
                                        required
                                        className="pl-9 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((s) => !s)
                                        }
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="password_confirmation"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Confirm password"
                                        required
                                        className="pl-9 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword((s) => !s)
                                        }
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-500">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                Sign Up
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
