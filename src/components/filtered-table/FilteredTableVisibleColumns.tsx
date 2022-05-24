import { FilteredTableColumn } from "./FilteredTable";

export type ColumnVisibilityChangeEvent = {
  columnId: string;
  isHidden: boolean;
};

export type FilteredTableVisibleColumnsProps = {
  columns: FilteredTableColumn[];
  onColumnVisibilityChange: (event: ColumnVisibilityChangeEvent) => void;
};

export default function FilteredTableVisibleColumns({
  columns,
  onColumnVisibilityChange,
}: FilteredTableVisibleColumnsProps) {
  function handleCheckboxChange(id: string, isVisible: boolean) {
    onColumnVisibilityChange({
      columnId: id,
      isHidden: !isVisible,
    });
  }

  return (
    <>
      <h3>Visible columns</h3>
      <ul>
        {columns.map((column) => (
          <li key={column.id}>
            <label htmlFor={`${column.id}_isVisible`}>
              <input
                id={`${column.id}_isVisible`}
                type="checkbox"
                checked={!column.isHidden}
                onChange={(e) =>
                  handleCheckboxChange(column.id, e.target.checked)
                }
              />
              {column.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
