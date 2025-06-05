import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  //   const { theme = 'system' } = useTheme();

  return (
    <Sonner
      visibleToasts={1}
      //   theme={theme as ToasterProps['theme']}
      position="bottom-center"
      className="custom-toaster"
      // className="toaster-group"
      toastOptions={{
        classNames: {
          toast: "animate-slide-up",
        },
      }}
      style={
        {
          bottom: "220px",
          textAlign: "center",
          borderColor: "red",
          "--normal-bg": "white",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
