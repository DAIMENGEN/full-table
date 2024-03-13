import {FormRule} from "antd";
import {ReactNode} from "react";

export type Dictionary = Record<string, any>;

export type TableCellRule = FormRule;

export type TableRowData = Dictionary & { key: string };

export type TableColumn = {
    title: string;
    dataIndex: string;
    width?: string;
    mutable?: boolean;
    mutableNode?: ReactNode;
    render?: (record: TableRowData, text?: string, rowIndex?: number) => ReactNode;
}

export type TableColumns = Array<TableColumn>;

export type TableProps = {
    mutable: boolean;
    originData: Array<TableRowData>;
    tableColumns: TableColumns;
    mutableCallback?: (newRecord: TableRowData, oldRecord?: TableRowData) => void;
}

export type TableCellProps = {
    rowData: TableRowData;
    editing: boolean;
    dataIndex: string;
    mutableNode?: ReactNode;
    children?: ReactNode;
    rowIndex?: number;
    rules?: Array<TableCellRule>;
}