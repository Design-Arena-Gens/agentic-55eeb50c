import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import type { TopPage } from "@/lib/data/types";
import { ArrowUpRight } from "lucide-react";

export function TopPagesTable({ pages }: { pages: TopPage[] }) {
  return (
    <Table>
      <Thead>
        <tr>
          <Th>Path</Th>
          <Th>Views</Th>
          <Th>Conversion</Th>
          <Th>Exit %</Th>
        </tr>
      </Thead>
      <Tbody>
        {pages.map((page) => (
          <Tr key={page.page} className="group">
            <Td className="flex items-center gap-2 text-foreground">
              <ArrowUpRight className="h-4 w-4 text-brand-9 opacity-0 transition group-hover:opacity-100" />
              {page.page}
            </Td>
            <Td>{page.views.toLocaleString()}</Td>
            <Td>{page.conversion.toFixed(1)}%</Td>
            <Td>{page.exit.toFixed(1)}%</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
