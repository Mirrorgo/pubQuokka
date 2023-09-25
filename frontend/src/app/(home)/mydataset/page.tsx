"use client";
import {
  Row,
  Tabs,
  Card,
  List,
  Divider,
  Typography,
  Descriptions,
  Badge,
} from "antd";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import type { DescriptionsProps } from "antd";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const data = [
  {
    title: "Dataset 1",
  },
  {
    title: "Dataset 2",
  },
  {
    title: "Dataset 3",
  },
  {
    title: "Dataset 4",
  },
  {
    title: "Dataset 5",
  },
  {
    title: "Dataset 6",
  },
];

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Simulate Type",
    children: "Blood Oxygen Saturation",
    span: 2,
  },
  {
    key: "2",
    label: "Simulate Size",
    children: "100",
  },
  {
    key: "3",
    label: "Resource Type",
    children: "Patient",
    span: 3,
  },
  {
    key: "4",
    label: "Status",
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: "5",
    label: "Information included",
    children: (
      <>
        1. Name
        <br />
        2. Identifier
        <br />
        3. Age
        <br />
        4. Birthday
        <br />
        5. Gender
        <br />
      </>
    ),
  },
];

const MyDataset: FC = () => {
  const router = useRouter();
  const handleClick = (title: string) => {
    setTitle(title);
    console.log(title);
  };
  const [set_title, setTitle] = useState(data[0].title);

  return (
    <div>
      <Row align={"middle"} justify={"start"}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="My Data Set" key="1">
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item onClick={() => handleClick(item.title)}>
                  <Card title={item.title}></Card>
                </List.Item>
              )}
            ></List>
          </TabPane>
        </Tabs>
      </Row>
      <Divider></Divider>
      <Paragraph style={{ fontSize: "x-large", fontWeight: "bold" }}>
        {set_title}
      </Paragraph>
      <Row align={"middle"} justify={"start"}>
        <Descriptions
          title="Review Configuration"
          bordered
          items={items}
        ></Descriptions>
      </Row>
    </div>
  );
};

export default MyDataset;
