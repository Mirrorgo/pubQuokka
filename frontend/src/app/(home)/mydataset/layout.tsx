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
  Avatar,
  Space,
  Button,
  Drawer,
  Modal,
  notification
} from "antd";
import { SmileOutlined } from '@ant-design/icons';
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import type { DescriptionsProps } from "antd";
import { DataSet, currentDataSetAtom } from "@/store/global";
import { useAtom } from "jotai";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

// const data = [
//   {
//     title: "Dataset1",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset2",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset3",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset4",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset5",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset6",
//     latestUpdateTime: "08.21.2023",
//   },
//   {
//     title: "Dataset7",
//     latestUpdateTime: "08.21.2023",
//   },
// ];

const ShareMembers = [
  {
    Avatar: 1,
    name: "LWZ",
  },
  {
    Avatar: 2,
    name: "LC",
  },
  {
    Avatar: 3,
    name: "CSY",
  },
  {
    Avatar: 4,
    name: "WJS",
  },
  {
    Avatar: 5,
    name: "GLS",
  },
];
const dataSets: DataSet[] = [
  {
    dataSetId: "1",
    title: "test1",
    configuration: {
      type: "Cmkqck Llar Ydgpgbvoa",
      point: 10,
      unit: "Wophgmy Rifhtxega Ngrauou Ncuttn",
      currentVersionId: "1",
    },
    datas: [
      {
        versionId: "1",
        time: "1998-08-26 17:27:53",
        data: [
          {
            time: "2014-07-29 18:25:47",
            value: "voluptate ipsum Duis",
          },
        ],
      },
    ],
  },
  {
    dataSetId: "2",
    title: "test2",
    configuration: {
      type: "Cmkqck Llar Ydgpgbvoa",
      point: 10,
      unit: "Wophgmy Rifhtxega Ngrauou Ncuttn",
      currentVersionId: "1",
    },
    datas: [
      {
        versionId: "1",
        time: "1998-08-26 17:27:53",
        data: [
          {
            time: "2014-07-29 18:25:47",
            value: "voluptate ipsum Duis",
          },
        ],
      },
    ],
  },
];

// const items: DescriptionsProps["items"] = [
//   {
//     key: "1",
//     label: "Simulate Type",
//     children: "Blood Oxygen Saturation",
//     span: 2,
//   },
//   {
//     key: "2",
//     label: "Simulate Points",
//     children: "100",
//   },
//   {
//     key: "3",
//     label: "Resource Type",
//     children: "Patient",
//     span: 3,
//   },
//   {
//     key: "4",
//     label: "Status",
//     children: <Badge status="processing" text="Running" />,
//     span: 3,
//   },
//   {
//     key: "5",
//     label: "Information included",
//     children: (
//       <>
//         1. Name
//         <br />
//         2. Identifier
//         <br />
//         3. Age
//         <br />
//         4. Birthday
//         <br />
//         5. Gender
//         <br />
//       </>
//     ),
//   },
// ];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const MyDataset: FC<{
  children: React.ReactNode;
}> = ({
  children, // will be a page or nested layout
}) => {
  const router = useRouter();
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom); // 仅临时使用，正常应该第一次打开不显示，点击后显示。如果点击0则显示0
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showDetail = (dataSetId: any) => {
    console.log(dataSetId, "info");
    const temp = dataSets.find((cur) => cur.dataSetId === dataSetId) as DataSet;
    setCurrentDataSet(temp);
    router.push(`/mydataset/${dataSetId}`);
  };
  const showModal = () => {
    setIsModalOpen(true);
    console.log("111")
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Successfully',
      description:
        'You have already shared the dataset to User Choosen',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }


  return (
    <div>
      <Row align={"middle"} justify={"start"}>
        <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
          <TabPane tab="My Data Set" key="1">
            <List
              bordered
              itemLayout="horizontal"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={dataSets}
              // footer={}
              renderItem={(item: any, index) => (
                <List.Item
                  key={item.dataSetId}
                  actions={[
                    <a key={1} onClick={() => showDetail(item.dataSetId)}>
                      Detail
                    </a>,
                    <a key={2} onClick={showDrawer}>
                      History
                    </a>,
                    <a key={3} onClick={showModal}>
                      Share
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={item.title}
                    description={item.latestUpdateTime}
                  />

                  {/* {item.content} */}
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Row>
      <Divider></Divider>
      {children}
      <Paragraph style={{ fontSize: "x-large", fontWeight: "bold" }}>
        {currentDataSet.title}
      </Paragraph>
      <Row align={"middle"} justify={"start"}>
        {/* <Descriptions
          title="Review Configuration"
          bordered
          items={items}
        ></Descriptions> */}
      </Row>
      <Drawer title="History" placement="right" onClose={onClose} open={open}>
        <p>08.21.2023</p>
        <p>06.21.2023</p>
        <p>04.21.2023</p>
      </Drawer>
      <Modal
        title="Share"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <List
          bordered
          itemLayout="horizontal"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={ShareMembers}
          // footer={}
          // renderItem={(item, index) => (
          //   <List.Item
          //     key={item.name}
          //     // actions={[
          //     //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          //     //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          //     //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          //     // ]}
          //     actions={[
          //       <Button key="submit" type="primary" loading={loading} onClick={hadleShare}>
          //         Share
          //       </Button>
          //     ]
          //     }>
          //     <List.Item.Meta
          //       avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.Avatar}`} />}
          //       title={item.name}></List.Item.Meta>
          //   </List.Item>
          // )}
          renderItem={(item, index) => {
            const [loading, setLoading] = useState(false);
            const hadleShare = () => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setOpen(false);
                setIsModalOpen(false);
                openNotification();
              }, 2000);

            }
            return (
              <List.Item
                key={item.name}
                // actions={[
                //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                // ]}
                actions={[
                  <Button key="submit" type="primary" loading={loading} onClick={hadleShare}>
                    Share
                  </Button>
                ]
                }>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.Avatar}`} />}
                  title={item.name}></List.Item.Meta>
              </List.Item>
            )

          }}
        ></List>
      </Modal>
      {contextHolder} 
    </div>
  );
};

export default MyDataset;
