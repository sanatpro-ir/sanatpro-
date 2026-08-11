import "./Container.css";
import clsx from "clsx";

export default function Container({
  children,
  size = "default",
  className = "",
}) {
  return (
    <div
      className={clsx(
        "mine-container",
        `mine-container-${size}`,
        className
      )}
    >
      {children}
    </div>
  );
}