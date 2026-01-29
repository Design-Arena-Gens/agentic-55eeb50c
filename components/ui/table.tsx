import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(function TableBase({ className, ...props }, ref) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full border-collapse text-left text-[13px] text-muted",
          className
        )}
        {...props}
      />
    </div>
  );
});
Table.displayName = "Table";

const Thead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn("sticky top-0 z-10 bg-neutral-2/90 backdrop-blur", className)} {...props}>
      {children}
    </thead>
  )
);
Thead.displayName = "Thead";

const Tbody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
  <tbody ref={ref} {...props} />
));
Tbody.displayName = "Tbody";

const Tr = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("transition hover:bg-neutral-3/40", className)} {...props} />
));
Tr.displayName = "Tr";

const Th = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-3 py-2 text-left font-medium text-muted first:rounded-l-[8px] last:rounded-r-[8px]", className)}
    {...props}
  />
));
Th.displayName = "Th";

const Td = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-3 py-2 text-foreground/90", className)} {...props} />
));
Td.displayName = "Td";

export { Table, Thead, Tbody, Tr, Th, Td };
