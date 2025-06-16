
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800/50 text-white shadow-xl transition-all duration-300 hover:shadow-indigo-500/15 hover:border-slate-700/50 light-mode:from-white/90 light-mode:to-slate-50/90 light-mode:border-slate-200/50 light-mode:text-slate-900 light-mode:hover:shadow-indigo-500/15 light-mode:hover:border-slate-300/50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold tracking-tight text-white light-mode:text-slate-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-400 light-mode:text-slate-600", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// CardBadgeImage component with enhanced styling and light mode support
const CardBadgeImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { containerClassName?: string }
>(({ className, containerClassName, alt, ...props }, ref) => (
  <div className={cn(
    "relative flex-shrink-0 rounded-xl overflow-hidden border-4 border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-500 shadow-lg shadow-indigo-500/5 light-mode:border-indigo-500/30 light-mode:group-hover:border-indigo-500/60",
    containerClassName
  )}>
    <img
      ref={ref}
      alt={alt || "Badge image"}
      className={cn("w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", className)}
      {...props}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 light-mode:from-slate-800/20"></div>
  </div>
))
CardBadgeImage.displayName = "CardBadgeImage"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadgeImage }
