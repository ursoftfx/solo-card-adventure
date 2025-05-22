
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <div className={cn("relative space-y-0", className)}>
      {children}
    </div>
  );
};

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineItem = ({ children, className }: TimelineItemProps) => {
  return (
    <div className={cn("relative flex gap-4", className)}>
      {children}
    </div>
  );
};

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TimelineIcon = ({ className, ...props }: TimelineIconProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={cn(
          "w-3 h-3 rounded-full z-10",
          className
        )}
        {...props}
      />
    </div>
  );
};

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

export const TimelineContent = ({ children, className }: TimelineContentProps) => {
  return (
    <div className={cn("flex-1", className)}>
      {children}
    </div>
  );
};
