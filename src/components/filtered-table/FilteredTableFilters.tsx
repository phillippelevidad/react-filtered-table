import { ChangeEvent, useState } from "react";
import { FilteredTableColumn } from "./FilteredTable";

/**
 * Exponho este tipo porque ele é visível externamente,
 * por ser o tipo do evento emitido por este componente quando
 * um filtro é aplicado.
 */
export type ColumnFilterEvent = {
  columnId: string;
  filter: any;
};

/**
 * Exponho este tipo porque ele é visível externamente,
 * por ser o tipo das props do componente @see FilteredTableFilters.
 */
export type FilteredTableFiltersProps = {
  columns: FilteredTableColumn[];
  onColumnFilter: (event: ColumnFilterEvent) => void;
};

/**
 * Gerencia as opções de filtro para o componente @see FilteredTable.
 * Recebe a lista de colunas da tabela em questão para apresentar
 * as opções de filtro de acordo com o tipo de cada coluna.
 */
export default function FilteredTableFilters({
  columns,
  onColumnFilter,
}: FilteredTableFiltersProps) {
  const [isAddingFilter, setIsAddingFilter] = useState(false);

  function handleAddFilterClick(): void {
    setIsAddingFilter(true);
  }

  function handleCancelClick(): void {
    setIsAddingFilter(false);
  }

  function handleColumnChange(e: ChangeEvent<HTMLSelectElement>): void {
    // A implementação atual é apenas um exemplo: está abrindo um
    // prompt comum para requisitar o valor de filtro. Na versão final,
    // deve apresentar um componente de filtro compatível com o tipo da
    // coluna, ex. DatePicker pra uma coluna do tipo DATE.
    const column = columns.find((column) => column.id === e.target.value)!;
    const filter = prompt(`Filter ${column.title} by:`);
    // Invoca o callback recebido para que o componente
    // dono dos dados faça a filtragem. Neste caso, é nosso
    // App; mas, numa aplicação conectada, seria um componente
    // ProductsTable ou algo assim.
    filter && onColumnFilter({ columnId: column.id, filter });
    setIsAddingFilter(false);
  }

  function handleRemoveFilterClick(columnId: string): void {
    onColumnFilter({ columnId, filter: null });
  }

  const filteredColumns = columns.filter((column) => !!column.filter);

  return (
    <div>
      <h3>Filters</h3>
      {filteredColumns.length > 0 ? (
        <ul>
          {filteredColumns.map((column) => (
            <li key={column.id}>
              {column.title} = {column.filter}
              <button onClick={() => handleRemoveFilterClick(column.id)}>
                x
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {isAddingFilter ? (
        <>
          <select onChange={handleColumnChange}>
            <option>Select column</option>
            {columns
              .filter(
                (column) =>
                  !filteredColumns.some((filtered) => column.id === filtered.id)
              )
              .map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
          </select>
          <button onClick={handleCancelClick}>x</button>
        </>
      ) : (
        <button onClick={handleAddFilterClick}>Add filter</button>
      )}
    </div>
  );
}
