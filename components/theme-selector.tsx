export {};

// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Palette, Zap, Building2, Moon, Sun } from "lucide-react"
// import { useTheme } from "@/hooks/use-theme"
// import type { ColorScheme } from "@/lib/colors"

// const themeOptions = [
//   {
//     key: "blue" as ColorScheme,
//     name: "Ocean Blue",
//     description: "Professional and trustworthy",
//     icon: Palette,
//     preview: ["#3b82f6", "#1e40af", "#172554"],
//   },
//   {
//     key: "electric" as ColorScheme,
//     name: "Electric Cyan",
//     description: "Modern and energetic",
//     icon: Zap,
//     preview: ["#06b6d4", "#0891b2", "#083344"],
//   },
//   {
//     key: "corporate" as ColorScheme,
//     name: "Corporate Gray",
//     description: "Clean and minimal",
//     icon: Building2,
//     preview: ["#64748b", "#334155", "#020617"],
//   },
//   {
//     key: "dark" as ColorScheme,
//     name: "Dark Mode",
//     description: "Sleek and modern",
//     icon: Moon,
//     preview: ["#1e293b", "#0f172a", "#ffffff"],
//   },
//   {
//     key: "light" as ColorScheme,
//     name: "Light Mode",
//     description: "Clean and bright",
//     icon: Sun,
//     preview: ["#ffffff", "#e2e8f0", "#334155"],
//   },
// ]

// export function ThemeSelector() {
//   const { colorScheme, setColorScheme } = useTheme()

//   return (
//     <div className="fixed top-4 right-4 z-50">
//       <Card className="bg-white/10 backdrop-blur-md border-white/20">
//         <CardContent className="p-4">
//           <h3 className="text-white font-semibold mb-3 text-sm">Color Themes</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {themeOptions.map((theme) => {
//               const Icon = theme.icon
//               const isActive = colorScheme === theme.key

//               return (
//                 <Button
//                   key={theme.key}
//                   variant={isActive ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setColorScheme(theme.key)}
//                   className={`flex flex-col items-center gap-1 h-auto p-2 ${
//                     isActive
//                       ? "bg-white/20 text-white border-white/30"
//                       : "text-white/70 hover:text-white hover:bg-white/10"
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span className="text-xs">{theme.name}</span>
//                   <div className="flex gap-1">
//                     {theme.preview.map((color, i) => (
//                       <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
//                     ))}
//                   </div>
//                 </Button>
//               )
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
