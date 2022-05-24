import { useEffect, useState } from "react";
import listProducts from "../api/listProducts";
import FilteredTable, {
  DataType,
  FilteredTableColumn,
  FilteredTableRow,
} from "./filtered-table/FilteredTable";
import { ColumnFilterEvent } from "./filtered-table/FilteredTableFilters";
import { ColumnVisibilityChangeEvent } from "./filtered-table/FilteredTableVisibleColumns";

const defaultColumns: FilteredTableColumn[] = [
  {
    id: "id",
    title: "Id",
    dataType: DataType.ID,
  },
  {
    id: "name",
    title: "Name",
    dataType: DataType.STRING,
  },
  {
    id: "price",
    title: "Price",
    dataType: DataType.NUMBER,
  },
  {
    id: "stock",
    title: "Stock",
    dataType: DataType.NUMBER,
    isHidden: true,
  },
  {
    id: "score",
    title: "Score",
    dataType: DataType.NUMBER,
    isHidden: true,
  },
];

export default function ProductTable() {
  const [columns, setColumns] = useState(defaultColumns);
  const [rows, setRows] = useState<FilteredTableRow[]>([]);

  /**
   * Busca os produtos de uma API.
   * Se tiver filtros, repassa os mesmos para a consulta.
   */
  useEffect(() => {
    const filters = columns
      .filter((column) => column.filter)
      .reduce((acc: Record<string, string>, curr) => {
        acc[curr.id] = curr.filter as string;
        return acc;
      }, {});
    setRows(
      listProducts(filters).map((entry) => ({
        id: entry["id"],
        data: entry,
      }))
    );
  }, [columns]);

  function handleColumnFilter(event: ColumnFilterEvent): void {
    setColumns(
      columns.map((column) => {
        if (column.id !== event.columnId) return column;
        return { ...column, filter: event.filter };
      })
    );
  }

  function handleColumnVisibilityChange(
    event: ColumnVisibilityChangeEvent
  ): void {
    setColumns(
      columns.map((column) => {
        if (column.id !== event.columnId) return column;
        return { ...column, isHidden: event.isHidden };
      })
    );
  }

  return (
    <>
      <h1>Products</h1>
      <hr />
      <FilteredTable
        columns={columns}
        rows={rows}
        onColumnFilter={handleColumnFilter}
        onColumnVisibilityChange={handleColumnVisibilityChange}
      />
    </>
  );
}
