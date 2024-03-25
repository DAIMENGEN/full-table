import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {FullTable, FullTableColumns} from "../dist";
import {DatePicker, Input} from "antd";
import {ColorPicker} from "./components/color-picker/color-picker";
import * as dayjs from "dayjs";

interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
    color: string;
    date: dayjs.Dayjs;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32 * i,
        address: `London Park no. ${i}`,
        color: "#000000",
        date: dayjs(),
    });
}

const tableColumns: FullTableColumns = [
    {
        title: "name",
        dataIndex: "name",
        width: '25%',
        editable: false,
        formControl: <Input/>,
    },
    {
        title: "age",
        dataIndex: "age",
        width: '15%',
        editable: true,
        formControl: <Input/>,
        sorter: (prev, curr) => prev.age - curr.age,
    },
    {
        title: "address",
        dataIndex: "address",
        width: '40%',
        editable: true,
        formControl: <Input/>,
        render: (record) => {
            return <span style={{color: "red"}}>{record.address}</span>
        }
    },
    {
        title: "color",
        dataIndex: "color",
        width: "5%",
        editable: true,
        formControl: <ColorPicker disabled={false}/>,
        render: (_, text) => {
            return <ColorPicker disabled={true} value={text} />
        }
    },
    {
        title: "date",
        dataIndex: "date",
        width: "10%",
        editable: true,
        formControl: <DatePicker />,
        render: (record) => {
            return <span>{record.date.format("YYYY-MM-DD")}</span>
        }
    }
];

const App = () => {
    return (
        <div>
            <FullTable editable={true}
                       removable={true}
                       originData={originData}
                       tableColumns={tableColumns}
                       onRowClick={(record) => {
                        console.log("record", record);
                       }}
                       editCallback={(newRecord, oldRecord) => {
                           console.log("newRecord", newRecord);
                           console.log("oldRecord", oldRecord);
                       }}
                       removeCallback={(record) => {
                           console.log("remove", record);
                       }}/>
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
