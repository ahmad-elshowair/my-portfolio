import { Icon } from "@iconify/react";
import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

import type { IconifyProps } from "./types";

interface Props extends Omit<ComponentProps<typeof Icon>, "icon"> {
  icon?: IconifyProps | null;
  /** Screen-reader label for icon-only contexts; omitted renders the bare glyph. */
  name?: string;
}

/**
 * The app's single icon component: renders any IconifyProps glyph,
 * guards optional data icons, and pairs an optional sr-only label
 * for contexts where the icon carries meaning on its own.
 */
const Iconify = forwardRef<SVGSVGElement, Props>(
  ({ icon, name, className, ...other }, ref) => {
    if (!icon) return null;

    if (name) {
      return (
        <span className={cn("inline-flex items-center", className)}>
          <Icon
            ref={ref}
            icon={icon}
            className="component-iconify h-[1em] w-[1em] shrink-0"
            aria-hidden="true"
            {...other}
          />
          <span className="sr-only">{name}</span>
        </span>
      );
    }

    return (
      <Icon
        ref={ref}
        icon={icon}
        className={cn("component-iconify h-5 w-5", className)}
        aria-hidden="true"
        {...other}
      />
    );
  },
);

Iconify.displayName = "Iconify";

export default Iconify;
