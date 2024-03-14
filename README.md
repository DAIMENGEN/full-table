# Full Table

Author: Mengen.dai.

WeChart: DME_000000

Note: Full Table is a project based on Typescript React, it is designed specifically for React projects, so it cannot work properly in non-React projects.

## What is Full Table

FullTable is a powerful HTML table react component that comes with editing capabilities. 

## **Features**

* Full Table supports editing of cell contents.

## **Installation**

```shell
npm install full-table
```

## **Basic Example**

```tsx
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
        age: 32,
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
        render: (record) => {
            return <span style={{color: "red"}}>{record.address}</span>
        }
    },
    {
        title: "color",
        dataIndex: "color",
        width: "5%",
        mutable: true,
        mutableNode: <ColorPicker disabled={false}/>,
        render: (_, text) => {
            return <ColorPicker disabled={true} value={text} />
        }
    },
    {
        title: "date",
        dataIndex: "date",
        width: "10%",
        mutable: true,
        mutableNode: <DatePicker />,
        render: (record) => {
            return <span>{record.date.format("YYYY-MM-DD")}</span>
        }
    }
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
```