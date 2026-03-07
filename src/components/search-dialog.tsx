"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 製品検索ダイアログ
 * 製品名・型番でリアルタイム検索
 */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // 検索結果をフィルタリング
  const filteredProducts = products.filter((product) => {
    if (!query.trim()) return false;
    const searchLower = query.toLowerCase();
    return (
      product.specs.basic.productName.toLowerCase().includes(searchLower) ||
      product.specs.basic.modelNumber.toLowerCase().includes(searchLower) ||
      product.specs.basic.manufacturer.toLowerCase().includes(searchLower)
    );
  });

  // キーボードショートカット (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 製品を選択したとき
  const handleSelect = useCallback(
    (productId: string) => {
      setOpen(false);
      setQuery("");
      router.push(`/products/${productId}`);
    },
    [router]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 text-muted-foreground"
          />
        }
      >
        <Search className="h-4 w-4" />
        <span>検索...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="sr-only">製品を検索</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="製品名・型番・メーカーで検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[300px] overflow-y-auto px-2 pb-2">
          {query.trim() && filteredProducts.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              「{query}」に一致する製品が見つかりませんでした
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="space-y-1">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left transition-colors",
                    "hover:bg-muted focus:bg-muted focus:outline-none"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {product.specs.basic.manufacturer}
                      </p>
                      <p className="font-medium">
                        {product.specs.basic.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.specs.basic.modelNumber}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.specs.basic.priceRange}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              製品名、型番、メーカー名で検索できます
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
