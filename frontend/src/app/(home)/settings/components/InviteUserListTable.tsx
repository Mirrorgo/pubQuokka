import { Space, Table } from "antd";
import React from "react";

type UserItem = {
  userId: string;
  username: string;
};
const username = "username";

function InviteUserListTable() {
  const handleInvite = (record: UserItem) => {
    console.log("record", record);
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
          <a onClick={() => handleInvite(record)}>Invite</a>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}

export default InviteUserListTable;
