import type {
  ListItemTypograph,
  TypographyTs,
} from "@/core/assets/types/Typography";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

function Big({ children, className, ...props }: TypographyTs) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-5xl font-bold tracking-tight text-balance sm:text-9xl",
        className,
      )}
      {...props}
    >
      {children || "Lorem ipsum dolor"}
    </h1>
  );
}

function H1({ children, className, ...props }: TypographyTs) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance sm:text-[57px]",
        className,
      )}
      {...props}
    >
      {children || "Lorem ipsum dolor"}
    </h1>
  );
}

function H2({ children, className, ...props }: TypographyTs) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, className, ...props }: TypographyTs) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ children, className, ...props }: TypographyTs) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

function P({ children, className, ...props }: TypographyTs) {
  return (
    <p className={cn("text-md not-first:mt-2", className)} {...props}>
      {children}
    </p>
  );
}

function Span({ children, className, ...props }: TypographyTs) {
  return (
    <span className={cn("text-base", className)} {...props}>
      {children}
    </span>
  );
}

function List({
  listItems,
  className,
  ...props
}: {
  listItems?: (ListItemTypograph | string)[];
} & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {listItems?.map((item, index) => (
        <li key={typeof item === "string" ? index : (item.id ?? index)}>
          {typeof item === "string" ? item : item.content}
        </li>
      ))}
    </ul>
  );
}

function Lead({ children, className, ...props }: TypographyTs) {
  return (
    <p className={cn("text-foreground leading-7", className)} {...props}>
      {children || "Dolor sit amet consectetur adipiscing elit."}
    </p>
  );
}

function Large({ children, className, ...props }: TypographyTs) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children || "Eiusmod tempor"}
    </div>
  );
}

function Small({ children, className, ...props }: TypographyTs) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    >
      {children || "Incididunt ut"}
    </small>
  );
}

function Muted({ children, className, ...props }: TypographyTs) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children || "Labore et dolore"}
    </p>
  );
}

function InputErrorMassage({ children, className, ...props }: TypographyTs) {
  if (!children) return null;

  return (
    <p
      className={cn("pt-1 ps-0.5 text-xs text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  Big,
  H1,
  H2,
  H3,
  H4,
  InputErrorMassage,
  Large,
  Lead,
  List,
  Muted,
  P,
  Small,
  Span,
};
