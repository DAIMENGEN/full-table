import * as React from "react";
import {useEffect, useState} from "react";
import {TableProps, TableRowData} from "../../core/structs/table";
import {Button, Form, Popconfirm, Space, Table as AntdTable} from "antd";
import {TableCell} from "./table-cell";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";

export const Table: React.FC<TableProps> = (props) => {
    const {editable = false, removable = false, originData, tableColumns: columns, onRowClick, removeCallback, editCallback} = props;
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [editingKey, setEditingKey] = useState<string>();
    const [dataSource, setDataSource] = useState(originData);
    const [submittable, setSubmittable] = useState<boolean>(false);
    const tableColumns = columns.map(column => {
        return {
            title: column.title,
            width: column.width,
            dataIndex: column.dataIndex,
            onCell: (record: TableRowData, rowIndex: number | undefined) => ({
                rowData: record,
                rowIndex: rowIndex,
                rules: column.rules,
                dataIndex: column.dataIndex,
                formControl: column.formControl,
                editing: column.editable && record.key === editingKey,
            }),
            sorter: column.sorter ? (prev: TableRowData, curr: TableRowData) => column.sorter && column.sorter(prev, curr) : undefined,
            render: (text: string, record: TableRowData, index: number | undefined) => {
                if (column.render) {
                    return column.render(record, text, index);
                } else {
                    return <>{text}</>
                }
            }
        }
    });
    const save = async (oldRecord: TableRowData) => {
        cancel();
        const newRecord = {...oldRecord, ...form.getFieldsValue()};
        setDataSource(dataSource => {
            const targetIndex = dataSource.findIndex(record => record.key === oldRecord.key);
            dataSource.splice(targetIndex, 1, newRecord);
            return [...dataSource];
        });
        editCallback && editCallback(newRecord, oldRecord);
    };
    const remove = async (record: TableRowData) => {
        setDataSource(dataSource => dataSource.filter(data => data.key !== record.key));
        removeCallback && removeCallback(record);
    }
    const edit = (record: Partial<TableRowData>) => {
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    };
    const cancel = () => setEditingKey(undefined);
    const tableColumnBuilder = () => {
        if (editable && removable) {
            return [
                ...tableColumns,
                {
                    title: "operation",
                    dataIndex: "operation",
                    render: (_: string, record: TableRowData) => {
                        const editing = record.key === editingKey;
                        return editing ? (
                            <Space size={`middle`}>
                                <Button title={`save`} disabled={!submittable} icon={<CheckOutlined/>} onClick={() => save(record)}/>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <Button title={`cancel`} icon={<CloseOutlined/>}/>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={`middle`}>
                                <Button icon={<EditOutlined/>} disabled={!!editingKey} onClick={() => edit(record)}/>
                                <Popconfirm title={"Sure to remove?"} onConfirm={() => remove(record)}>
                                    <Button title={`remove`} icon={<DeleteOutlined/>}/>
                                </Popconfirm>
                            </Space>
                        )
                    }
                }
            ] as ColumnsType<TableRowData>;
        } else if (editable) {
            return [
                ...tableColumns,
                {
                    title: "operation",
                    dataIndex: "operation",
                    render: (_: string, record: TableRowData) => {
                        const editing = record.key === editingKey;
                        return editing ? (
                            <Space size={`middle`}>
                                <Button title={`save`} disabled={!submittable} icon={<CheckOutlined/>} onClick={() => save(record)}/>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <Button title={`cancel`} icon={<CloseOutlined/>}/>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={`middle`}>
                                <Button icon={<EditOutlined/>} disabled={!!editingKey} onClick={() => edit(record)}/>
                            </Space>
                        )
                    }
                }
            ] as ColumnsType<TableRowData>;
        } else if (removable) {
            return [
                ...tableColumns,
                {
                    title: "operation",
                    dataIndex: "operation",
                    render: (_: string, record: TableRowData) => {
                        return (
                            <Space size={`middle`}>
                                <Popconfirm title={"Sure to remove?"} onConfirm={() => remove(record)}>
                                    <Button title={`remove`} icon={<DeleteOutlined/>}/>
                                </Popconfirm>
                            </Space>
                        )
                    }
                }
            ] as  ColumnsType<TableRowData>;
        } else {
            return tableColumns as  ColumnsType<TableRowData>;
        }
    }
    useEffect(() => {
        setDataSource(originData)
        return () => {
            form.resetFields();
        }
    }, [props]);
    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values])
    return (
        <Form form={form}>
            <AntdTable bordered={true}
                       dataSource={dataSource}
                       columns={tableColumnBuilder()}
                       components={{
                           body: {
                               cell: TableCell,
                           }
                       }}
                       onRow={(record: TableRowData) => ({
                           onClick: () => onRowClick && onRowClick(record),
                       })}
            />
        </Form>
    )
}