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

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const data = [
  {
    title: "Dataset1",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset2",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset3",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset4",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset5",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset6",
    latestUpdateTime: "08.21.2023",
  },
  {
    title: "Dataset7",
    latestUpdateTime: "08.21.2023",
  },
];

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

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Simulate Type",
    children: "Blood Oxygen Saturation",
    span: 2,
  },
  {
    key: "2",
    label: "Simulate Points",
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

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const MyDataset: FC = () => {
  const router = useRouter();
  const handleClick = (title: string) => {
    setTitle(title);
    console.log(title);
  };
  const [set_title, setTitle] = useState(data[0].title);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            {/* <List
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
            ></List> */}
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
              dataSource={data}
              // footer={}
              renderItem={(item, index) => (
                <List.Item
                  key={item.title}
                  // actions={[
                  //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  // ]}
                  actions={[
                    <a onClick={showDrawer}>View</a>,
                    <a onClick={showModal}>Share</a>,
                  ]
                  }
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
