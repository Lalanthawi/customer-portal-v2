"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  LucideIcon
} from "lucide-react"

const statCardVariants = cva(
  "relative transition-all duration-200 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-card border",
        gradient: "bg-gradient-to-br from-card via-card to-accent/20 border",
        outline: "border-2",
        filled: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  subtitle?: string
  description?: string
  icon?: LucideIcon
  iconColor?: string
  trend?: {
    value: number
    label?: string
    isPositive?: boolean
  }
  badge?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  progress?: {
    value: number
    max?: number
    label?: string
    showValue?: boolean
  }
  action?: {
    label: string
    onClick: () => void
  }
  loading?: boolean
  footer?: React.ReactNode
}

export function StatCard({
  className,
  variant,
  size,
  title,
  value,
  subtitle,
  description,
  icon: Icon,
  iconColor,
  trend,
  badge,
  progress,
  action,
  loading = false,
  footer,
  ...props
}: StatCardProps) {
  const isPositive = trend?.isPositive ?? (trend ? trend.value > 0 : null)

  if (loading) {
    return (
      <Card className={cn(statCardVariants({ variant, size }), className)} {...props}>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(statCardVariants({ variant, size }), className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              {badge && (
                <Badge variant={badge.variant} className="h-5 text-xs">
                  {badge.label}
                </Badge>
              )}
            </div>
          </div>
          {Icon && (
            <div className={cn(
              "rounded-lg p-2",
              variant === "filled" ? "bg-primary-foreground/20" : "bg-muted"
            )}>
              <Icon className={cn(
                "h-4 w-4",
                iconColor || (variant === "filled" ? "text-primary-foreground" : "text-muted-foreground")
              )} />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {value}
            </div>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isPositive ? "text-emerald-600" : "text-red-600"
              )}>
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(trend.value)}%</span>
                {trend.label && (
                  <span className="text-muted-foreground ml-1">{trend.label}</span>
                )}
              </div>
            )}
          </div>

          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}

          {description && (
            <CardDescription className="text-xs">
              {description}
            </CardDescription>
          )}

          {progress && (
            <div className="pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {progress.label || "Progress"}
                </span>
                <span className="font-medium">
                  {progress.showValue
                    ? `${progress.value}/${progress.max || 100}`
                    : `${Math.round((progress.value / (progress.max || 100)) * 100)}%`}
                </span>
              </div>
              <Progress
                value={(progress.value / (progress.max || 100)) * 100}
                className="h-1.5"
              />
            </div>
          )}
        </div>
      </CardContent>

      {(action || footer) && (
        <CardFooter className="pt-3">
          {footer || (
            action && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={action.onClick}
              >
                {action.label}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            )
          )}
        </CardFooter>
      )}
    </Card>
  )
}

// Simple Metric Card
export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  className
}: {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  className?: string
}) {
  const isPositive = change ? change > 0 : null

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg border bg-card",
      "hover:bg-accent/50 transition-colors cursor-pointer",
      className
    )}>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold">{value}</p>
          {change !== undefined && (
            <span className={cn(
              "text-xs font-medium flex items-center",
              isPositive ? "text-emerald-600" : change === 0 ? "text-muted-foreground" : "text-red-600"
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : change !== 0 && <TrendingDown className="h-3 w-3 mr-0.5" />}
              {isPositive && "+"}{change}%
              {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
            </span>
          )}
        </div>
      </div>
      {Icon && (
        <div className="rounded-full bg-muted p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

// Activity Card for showing real-time metrics
export function ActivityCard({
  title,
  value,
  subtitle,
  activity,
  className
}: {
  title: string
  value: string | number
  subtitle?: string
  activity?: number[]
  className?: string
}) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {activity && activity.length > 0 && (
          <div className="flex items-end gap-0.5 h-12">
            {activity.map((val, i) => (
              <div
                key={i}
                className="w-1.5 bg-primary/60 rounded-t"
                style={{
                  height: `${(val / Math.max(...activity)) * 100}%`,
                  minHeight: '2px'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}