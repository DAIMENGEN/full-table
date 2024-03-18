import React from "react";
import {Form} from "antd";
import {TableCellProps} from "../../core/structs/table";
export const TableCell: React.FC<TableCellProps> = (props) => {
    const {rules, dataIndex, editing, children, formControl} = props;
    return (
        <td>
            {
                editing ? (
                        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
                            {formControl}
                        </Form.Item>)
                    : (children)
            }
        </td>
    )
}