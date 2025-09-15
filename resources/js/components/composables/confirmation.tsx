"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/composables/button";

interface ConfirmationProps {
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    className?: string;
}

export default function Confirmation({
    open,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    className,
}: ConfirmationProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                className={cn(
                    "bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm",
                    className,
                )}
            >
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {message}
                </p>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="px-4 py-2"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        className="px-4 py-2"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
