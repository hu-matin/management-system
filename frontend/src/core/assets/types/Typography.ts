import type { HTMLAttributes, ReactNode } from "react";

export interface TypographyTs extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface ListItemTypograph {
  id?: string | number;
  content: ReactNode;
}
