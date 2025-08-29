"use client";
import * as React from "react";
import { useForm, usePage } from "@inertiajs/react";
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
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = React.useState(false);
    const { data, setData, post, processing } = useForm({
        email: "",
        password: "",
    });

    const { errors } = usePage().props;
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/login");
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full max-w-md mx-auto border-slate-200/70 shadow-xl">
                <CardHeader className="space-y-2">
                    {/* Back button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-fit -ml-2 -mt-2 cursor-pointer "
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-md">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                Welcome back
                            </CardTitle>
                            <CardDescription>
                                Sign in to your ELICTRIC account
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
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
                                    autoComplete="email"
                                    className="pl-9"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        {/* Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm text-slate-600 underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                    className="pl-9 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
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
                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                <span className="inline-flex items-center gap-2">
                                    {processing ? "Logging in..." : "Login"}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                            >
                                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center">
                                    {/* Google G */}
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        aria-hidden
                                    >
                                        <path d="M12 11v3.6h5.1c-.2 1.3-1.5 3.9-5.1 3.9-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 4.5 14.6 3.6 12 3.6 6.9 3.6 2.7 7.8 2.7 12.9S6.9 22.2 12 22.2c6.3 0 10.5-4.4 10.5-10.5 0-.7-.1-1.1-.2-1.7H12z" />
                                    </svg>
                                </span>
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-2 text-center text-sm text-slate-600">
                            Don&apos;t have an account?
                            <a
                                href="#"
                                className="font-medium underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
