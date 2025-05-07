"use client"

import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeLanguageToggle() {
  const { setTheme, theme } = useTheme()
  const { toggleLanguage, t } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleLanguage}
        className="rounded-full bg-white/20 backdrop-blur-sm dark:bg-[#3d2150]/50 dark:text-[#e0d5e6] dark:border-[#5c3a70]"
        aria-label={t("language.switch")}
      >
        <Globe className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm dark:bg-[#3d2150]/50 dark:text-[#e0d5e6] dark:border-[#5c3a70]"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark:bg-[#231030] dark:border-[#3d2150]">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="dark:text-[#b8a2c5] dark:focus:bg-[#3d2150] dark:focus:text-[#e0d5e6]"
          >
            {t("theme.light")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="dark:text-[#b8a2c5] dark:focus:bg-[#3d2150] dark:focus:text-[#e0d5e6]"
          >
            {t("theme.dark")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
