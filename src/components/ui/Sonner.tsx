import { useApp } from "@/lib/context";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({
  isCompact,
  ...props
}: { isCompact?: boolean } & ToasterProps) => {
  const { theme } = useApp();

  const isDark = theme === "dark";

  return (
    <Sonner
      visibleToasts={1}
      position="bottom-center"
      className="custom-toaster"
      toastOptions={{
        classNames: {
          toast: "animate-slide-up",
        },
      }}
      style={
        {
          bottom: isCompact ? "50px" : "220px",
          textAlign: "center",
          // Dynamic theming
          "--normal-bg": isDark ? "hsl(222.2 47.4% 5.5%)" : "white",
          "--normal-text": isDark
            ? "hsl(210 20% 98%)"
            : "hsl(222.2 47.4% 11.2%)",
          "--normal-border": isDark
            ? "hsl(217.2 32.6% 17.5%)"
            : "hsl(220 13% 91%)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
