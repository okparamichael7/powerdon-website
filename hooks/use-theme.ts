"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type ColorScheme, colorSchemes } from "@/lib/colors"

interface ThemeContextType {
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
  colors: (typeof colorSchemes)[ColorScheme]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("blue")

  useEffect(() => {
    const saved = localStorage.getItem("powerdon-color-scheme") as ColorScheme
    if (saved && colorSchemes[saved]) {
      setColorScheme(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("powerdon-color-scheme", colorScheme)

    // Apply CSS custom properties
    const root = document.documentElement
    const colors = colorSchemes[colorScheme]

    // Primary colors
    Object.entries(colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value)
    })

    // Secondary colors
    Object.entries(colors.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--color-secondary-${key}`, value)
    })

    // Accent colors
    Object.entries(colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--color-accent-${key}`, value)
    })
  }, [colorScheme])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        colors: colorSchemes[colorScheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
