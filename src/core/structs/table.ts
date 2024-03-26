import {FormRule} from "antd";
import {ReactNode} from "react";

export type Dictionary = Record<string, any>;

export type TableCellRule = FormRule;

export type TableRowData = Dictionary & { key: string, disableRemove?: boolean, disableEdit?: boolean };

export type TableColumn = {
    title: string;
    dataIndex: string;
    width?: string;
    editable?: boolean;
    formControl?: ReactNode;
    rules?: Array<TableCellRule>;
    sorter?: (prev: TableRowData, curr: TableRowData) => number;
    render?: (record: TableRowData, text?: string, rowIndex?: number) => ReactNode;
}

export type TableColumns = Array<TableColumn>;

export type TableProps = {
    originData: Array<TableRowData>;
    tableColumns: TableColumns;
    editable?: boolean;
    removable?: boolean;
    onRowClick?: (record: TableRowData) => void;
    editCallback?: (newRecord: TableRowData, oldRecord?: TableRowData) => void;
    removeCallback?: (record: TableRowData) => void;
}

export type TableCellProps = {
    rowData: TableRowData;
    editing: boolean;
    dataIndex: string;
    formControl?: ReactNode;
    children?: ReactNode;
    rowIndex?: number;
    rules?: Array<TableCellRule>;
}