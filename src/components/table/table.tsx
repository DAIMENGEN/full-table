import * as React from "react";
import {useEffect, useState} from "react";
import {TableProps, TableRowData} from "../../core/structs/table";
import {Button, Form, Popconfirm, Space, Table as AntdTable} from "antd";
import {TableCell} from "./table-cell";
import {ColumnsType} from "antd/es/table";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
export const Table: React.FC<TableProps> = (props) => {
    const {mutable, originData, tableColumns, mutableCallback} = props;
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>();
    const [dataSource, setDataSource] = useState(originData);
    const isEditing = (record: TableRowData) => record.key === editingKey;
    const edit = (record: Partial<TableRowData>) => {
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    };
    const cancel = () => setEditingKey(undefined);
    const save = async (oldRecord: TableRowData) => {
        cancel();
        const newRecord = {key: oldRecord.key, ...form.getFieldsValue()};
        setDataSource(dataSource => {
            const targetIndex = dataSource.findIndex(record => record.key === oldRecord.key);
            dataSource.splice(targetIndex, 1, newRecord);
            return [...dataSource];
        });
        mutableCallback && mutableCallback(newRecord, oldRecord);
    };
    const _tableColumns = tableColumns.map(column => {
        return {
            title: column.title,
            width: column.width,
            dataIndex: column.dataIndex,
            onCell: (record: TableRowData, rowIndex: number | undefined) => ({
                rowData: record,
                editing: isEditing(record) && column.mutable,
                dataIndex: column.dataIndex,
                mutableNode: column.mutableNode,
                rowIndex: rowIndex,
            }),
            render: (text: string, record: TableRowData, index: number | undefined) => {
                if (column.render) {
                   return  column.render(record, text, index);
                } else {
                    return <>{text}</>
                }
            }
        }
    });
    const columns = (mutable ? [
        ..._tableColumns,
        {
            title: "operation",
            dataIndex: "operation",
            render: (_: string, record: TableRowData) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size={`middle`}>
                        <Button title={`save`} icon={<CheckOutlined/>} onClick={() => save(record)}/>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button title={`cancel`} icon={<CloseOutlined/>}/>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Button icon={<EditOutlined />} disabled={!!editingKey} onClick={() => edit(record)}/>
                );
            }
        }
    ] : _tableColumns) as ColumnsType<TableRowData>;
    useEffect(() => setDataSource(originData), [props]);
    return (
        <Form form={form}>
            <AntdTable bordered={true}
                       dataSource={dataSource}
                       columns={columns}
                       components={{
                           body: {
                               cell: TableCell,
                           }
                       }}/>
        </Form>
    )
}