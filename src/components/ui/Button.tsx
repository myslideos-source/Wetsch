"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-off-white hover:bg-accent-dark",
  secondary: "bg-graphite text-off-white hover:bg-black",
  ghost: "bg-transparent text-graphite hover:bg-anthracite/5",
  "outline-light": "bg-transparent text-off-white border border-off-white/40 hover:border-off-white",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent) => {
    if (!magnetic || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wide transition-colors duration-200 rounded-full whitespace-nowrap",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const motionProps = {
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 20, mass: 0.5 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if ("href" in props && props.href) {
    return (
      <motion.span
        ref={ref as React.Ref<HTMLSpanElement>}
        className="inline-block"
        {...motionProps}
      >
        <Link
          href={props.href}
          onClick={props.onClick}
          target={props.target}
          rel={props.rel}
          className={classes}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
