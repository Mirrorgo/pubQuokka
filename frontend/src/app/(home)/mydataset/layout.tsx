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
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DescriptionsProps } from "antd";
import { DataSet, DataSetListItem, currentDataSetAtom, currentEditingDataSetAtom, currentUserAtom } from "@/store/global";
import { useAtom } from "jotai";
import { getDataSetListByUserID, queryDataSetById } from "@/service/dataset";
import { queryUsersByOrganization } from "@/service/user";
import { MsgType } from "@/service/requestType";

const { TabPane } = Tabs;
const { Paragraph } = Typography;


// const ShareMembers = [
//   {
//     Avatar: 1,
//     name: "LWZ",
//   },
//   {
//     Avatar: 2,
//     name: "LC",
//   },
//   {
//     Avatar: 3,
//     name: "CSY",
//   },
//   {
//     Avatar: 4,
//     name: "WJS",
//   },
//   {
//     Avatar: 5,
//     name: "GLS",
//   },
// ];
let dataSets: DataSet[] = [
  {
    dataSetID: "1",
    title: "test1",
    modelType: "",
    defaultTop: "",
    defaultBottom: "",
    unit: "",
    dataSetData: [
      {
        versionID: "1",
        createdTime: "1998-08-26 17:27:53",
        dataSet: [
          {
            x: "2014-07-29 18:25:47",
            y: "20",
          },
        ],
      },
    ],
  },
];


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
    const [currentVersion, setCurremtVersion] = useAtom(currentEditingDataSetAtom)
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shareMembers, setShareMembers] = useState<
    { userId: string; username: string }[]
  >([]);
    const showDetail = (dataSetId: string) => {
      console.log(dataSetId, "info");
      // const temp = dataSets.find((cur) => cur.dataSetID === dataSetId) as DataSet;
      // setCurrentDataSet(temp);
      async function getDataSetById() {
        const res = await queryDataSetById({
          dataSetID: dataSetId,
        });;
        const historyDataSet: DataSet = res.data.data
        setCurrentDataSet(historyDataSet)
      }
      getDataSetById();
        router.push(`/mydataset/${dataSetId}`);
      };
      const showModal = () => {
        async function getSharedMembers() {
          const res = await queryUsersByOrganization({
            organizationId: currentUser.organizationId,
          });
          if (res.data.msg === MsgType.SUCCESS) {
            setShareMembers(res.data.data)
          }
        };
        getSharedMembers();
        setIsModalOpen(true);
        console.log("111")
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const [historyDataSet, setHistoryDataSet] = useState<DataSet>();
      const showDrawer = (id: string) => {
        async function getDataSetById() {
          const res = await queryDataSetById({
            dataSetID: id,
          });;
          //   list: [res.data.data],
          // }));

          const historyDataSet: DataSet = res.data.data
          setHistoryDataSet(historyDataSet)
        }
        getDataSetById();
        setOpen(true);
      };

      const showHistoryVersion = (versionID: string) => {
        setCurremtVersion(versionID);
        setCurrentDataSet(historyDataSet as DataSet);
        router.push("/diagram")
      }

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
      // getDataSetListByUserID
      const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
      const [datasetData, setDatasetData] = useState<DataSetListItem[]>();
      useEffect(() => {
        console.log(currentUser.userId, "userID inside Effect")
        async function initDataSetList() {
          const res = await getDataSetListByUserID(currentUser.userId);
          //   list: [res.data.data],
          // }));
          const dataSetList: DataSetListItem[] = res.data.data
          setDatasetData(dataSetList);
        }
        initDataSetList();
      }, [currentUser.userId])

      console.log(datasetData, "datasetData")
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
                  // dataSource={dataSets}
                  dataSource={datasetData}
                  // footer={}
                  renderItem={(item: any, index) => (
                    <List.Item
                      key={item.dataSetID}
                      actions={[
                        <a key={1} onClick={() => showDetail(item.dataSetID)}>
                          Detail
                        </a>,
                        <a key={2} onClick={() => showDrawer(item.dataSetID)}>
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
          
          <Paragraph style={{ fontSize: "x-large", fontWeight: "bold" }}>
            {currentDataSet.title}
          </Paragraph>
          {children}
          <Row align={"middle"} justify={"start"}>
            {/* <Descriptions
          title="Review Configuration"
          bordered
          items={items}
        ></Descriptions> */}
          </Row>
          <Drawer title="History" placement="right" onClose={onClose} open={open}>
            {/* <p>08.21.2023</p>
        <p>06.21.2023</p>
        <p>04.21.2023</p> */}
            <List
              dataSource={historyDataSet?.dataSetData}
              renderItem={(item: any, index) => (

                <List.Item
                  key={item.versionID}
                  actions={[
                    <a key={1} onClick={() => showHistoryVersion(item.versionID)}>
                      Check
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    title={item.createdTime}
                  />
                </List.Item>
              )

              }
            >

            </List>
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
              dataSource={shareMembers}
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
                const hadleShare = () => {
                  setLoading(true);
                  setTimeout(() => {
                    setOpen(false);
                    setIsModalOpen(false);
                    openNotification();
                  }, 2000);

                }
                return (
                  <List.Item
                    key={item.userId}
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
                      avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=3 `} />}
                      title={item.username}></List.Item.Meta>
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
