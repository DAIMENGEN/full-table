import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {FullTable, FullTableColumns} from "../dist";
import {Input} from "antd";

interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const tableColumns: FullTableColumns = [
    {
        title: "name",
        dataIndex: "name",
        width: '25%',
        mutable: true,
        mutableNode: <Input/>
    },
    {
        title: "age",
        dataIndex: "age",
        width: '15%',
        mutable: true,
        mutableNode: <Input/>
    },
    {
        title: "address",
        dataIndex: "address",
        width: '40%',
        mutable: true,
        mutableNode: <Input/>,
        render: (record, text, rowIndex) => {
            console.log("record", record);
            console.log("text", text);
            console.log("rowIndex", rowIndex);
            return <span style={{color: "red"}}>{text}</span>
        }
    },
];

const App = () => {
    return (
        <div>
            <FullTable mutable={true} originData={originData} tableColumns={tableColumns}
                       mutableCallback={(newRecord, oldRecord) => {
                           console.log("newRecord", newRecord);
                           console.log("oldRecord", oldRecord);
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
