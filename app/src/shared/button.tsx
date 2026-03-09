import type { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red";
  onClick?: () => void;
};

export default function Button({
  children,
  size = "medium",
  color = "blue",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${size} btn-${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}