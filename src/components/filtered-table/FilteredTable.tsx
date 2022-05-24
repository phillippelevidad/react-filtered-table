import FilteredTableFilters, {
  ColumnFilterEvent,
} from "./FilteredTableFilters";
import FilteredTableVisibleColumns, {
  ColumnVisibilityChangeEvent,
} from "./FilteredTableVisibleColumns";

export enum DataType {
  STRING = "String",
  NUMBER = "Number",
  EMAIL = "Date",
  ID = "Date",
  PRICE = "Date",
}

export type FilteredTableColumn = {
  id: string;
  title: string;
  dataType?: DataType;
  isHidden?: boolean;
  filter?: any;
};

export type FilteredTableRow = {
  id: any;
  data: Record<string, any>;
};

export type FilteredTableProps = {
  columns: FilteredTableColumn[];
  rows: FilteredTableRow[];
  onColumnFilter: (event: ColumnFilterEvent) => void;
  onColumnVisibilityChange: (event: ColumnVisibilityChangeEvent) => void;
};

function setColumnDefaults(columns: FilteredTableColumn[]): void {
  columns.forEach((column) => {
    column.dataType = column.dataType || DataType.STRING;
    column.isHidden = !!column.isHidden;
  });
}

export default function FilteredTable({
  columns,
  rows,
  onColumnFilter,
  onColumnVisibilityChange,
}: FilteredTableProps) {
  setColumnDefaults(columns);
  const visibleColumns = columns.filter((column) => column.isHidden === false);

  return (
    <>
      <FilteredTableFilters
        columns={visibleColumns}
        onColumnFilter={onColumnFilter}
      />
      <br />
      <FilteredTableVisibleColumns
        columns={columns}
        onColumnVisibilityChange={onColumnVisibilityChange}
      />
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {visibleColumns.map((column) => (
                <td key={`${row.id}${column.id}`}>{row.data[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
