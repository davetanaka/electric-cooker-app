"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/**
 * LinkButtonコンポーネント
 * buttonVariantsのスタイルを持つLinkコンポーネント
 */
type LinkButtonProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    disabled?: boolean;
  };

export function LinkButton({
  className,
  variant,
  size,
  children,
  disabled,
  ...props
}: LinkButtonProps) {
  // disabled時はクリック不可のspanとして表示
  if (disabled) {
    return (
      <span
        className={cn(
          buttonVariants({ variant, size, className }),
          "pointer-events-none opacity-50"
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
