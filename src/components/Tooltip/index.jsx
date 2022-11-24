import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import "./styles.css";
export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="TooltipContent z-50"
          sideOffset={5}
          side="top"
          align="center"
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow
            className="TooltipArrow"
            width={11}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
