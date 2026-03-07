"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";

/**
 * ヘッダーナビゲーションコンポーネント
 * モバイルとデスクトップの両方に対応したレスポンシブナビゲーション
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "ホーム", href: "/" },
    { name: "製品比較", href: "/compare" },
    { name: "お気に入り", href: "/favorites" },
    { name: "AIに相談", href: "/chat" },
    { name: "このサイトについて", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Search className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold whitespace-nowrap hidden sm:inline">電気調理鍋 比較ガイド</span>
          <span className="text-lg font-bold whitespace-nowrap sm:hidden">比較ガイド</span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* デスクトップCTAボタン */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <SearchDialog />
          <Link
            href="/compare"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Search className="mr-2 h-4 w-4" />
            製品を比較する
          </Link>
          <Link
            href="/chat"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            AIに相談
          </Link>
          <ThemeToggle />
        </div>

        {/* モバイルメニュー */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" })
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニューを開く</span>
            </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href="/compare"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center"
                  )}
                >
                  <Search className="mr-2 h-4 w-4" />
                  製品を比較する
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setIsOpen(false)}
                  className={cn(buttonVariants(), "w-full justify-center")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  AIに相談
                </Link>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
