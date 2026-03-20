"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

/**
 * テーマ切り替えボタン
 * ライト/ダーク/システム設定を循環
 * next-themes の suppressHydrationWarning と組み合わせて使用
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="h-9 w-9"
      suppressHydrationWarning
      title={
        theme === "system"
          ? "システム設定"
          : theme === "dark"
          ? "ダークモード"
          : "ライトモード"
      }
    >
      {resolvedTheme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">テーマを切り替え</span>
    </Button>
  );
}
