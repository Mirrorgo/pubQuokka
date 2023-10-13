import { MsgType } from "@/service/requestType";
import { queryDeleteMember } from "@/service/user";
import { Space, Table } from "antd";
import React from "react";

type UserItem = {
  userId: string;
  username: string;
};
const username = "username";

function UserListTable() {
  const handleDelete = async (record: UserItem) => {
    console.log("record", record);
    const res = await queryDeleteMember({ userId: record.userId });
    if (res.data.msg === MsgType.SUCCESS) {
      console.log();
    }
  };
  const dataSource = [
    {
      userId: "1",
      username: "111",
    },
  ];

  const columns = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: username,
      dataIndex: username,
      key: username,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: UserItem) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}

export default UserListTable;
