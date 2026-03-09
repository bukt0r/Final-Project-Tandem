import type { ReactNode, ReactElement } from "react";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red";
  onClick?: () => void;
}

export default function Button({
  children,
  size = "medium",
  color = "blue",
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      className={`btn btn-${size} btn-${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}