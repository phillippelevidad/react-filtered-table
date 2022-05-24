import {
  DataType,
  FilteredTableColumn,
} from "../components/filtered-table/FilteredTable";
import { v4 as uuidv4 } from "uuid";
import generatedName from "sillyname";

type ColumnWithGenerator = FilteredTableColumn & {
  generator: () => string;
};

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const defaultColumns: ColumnWithGenerator[] = [
  {
    id: "id",
    title: "Id",
    dataType: DataType.ID,
    generator: () => uuidv4().substring(0, 8),
  },
  {
    id: "name",
    title: "Name",
    dataType: DataType.STRING,
    generator: () => generatedName(),
  },
  {
    id: "price",
    title: "Price",
    dataType: DataType.NUMBER,
    generator: () => "$ " + getRandomNumber(500, 5000).toFixed(2),
  },
  {
    id: "stock",
    title: "Stock",
    dataType: DataType.NUMBER,
    isHidden: true,
    generator: () => Math.floor(getRandomNumber(0, 999)).toString(),
  },
  {
    id: "score",
    title: "Score",
    dataType: DataType.NUMBER,
    isHidden: true,
    generator: () => getRandomNumber(0, 5).toFixed(2),
  },
];

const startingRows: Record<string, string>[] = Array.from(Array(50).keys()).map(
  (_) => {
    return defaultColumns.reduce((obj: Record<string, string>, column) => {
      obj[column.id] = column.generator();
      return obj;
    }, {});
  }
);

/**
 * Esta é uma API fake. Os dados foram gerados aleatoriamente em memória,
 * conforme pode ser visto acima.
 */
export default function listProducts(
  filters: Record<string, string> | undefined = undefined
): Record<string, string>[] {
  if (!filters) return startingRows;
  return startingRows.filter((row) => {
    return Object.keys(filters).every((key) => {
      const filter = filters[key].toLowerCase();
      const value = row[key].toLowerCase();
      return value.indexOf(filter) >= 0;
    });
  });
}
