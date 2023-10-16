import { MsgType } from "@/service/requestType";
import { queryDeleteMember, queryUsersByOrganization } from "@/service/user";
import { UserInfoType } from "@/store/global";
import { ReloadOutlined } from "@ant-design/icons";
import { Space, Table, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";

type UserItem = {
  userId: string;
  username: string;
};
const username = "username";

function UserListTable({ currentUser }: { currentUser: UserInfoType }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (record: UserItem) => {
    console.log("record", record);
    const res = await queryDeleteMember({ userId: record.userId });
    if (res.data.msg === MsgType.SUCCESS) {
      console.log();
      fetch();
    }
  };
  const [dataSource, setDataSource] = useState<
    { userId: string; username: string }[]
  >([]);

  const fetch = useCallback(async () => {
    setLoading(true); // 开始请求前设置 loading 为 true
    const res = await queryUsersByOrganization({
      organizationId: currentUser.organizationId,
    });
    if (res.data.msg === MsgType.SUCCESS) {
      setDataSource(res.data.data);
    }
    setLoading(false); // 请求完成后设置 loading 为 false
  }, [currentUser, setDataSource]);
  useEffect(() => {
    // 通过destroy on close来实现每次打开重新请求
    fetch();
  }, [currentUser.organizationId, fetch]);
  const handleReload = () => {
    fetch();
  };

  const columns = [
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>
          Organization Member Management
        </Typography.Title>
        <ReloadOutlined onClick={handleReload} />
      </div>
      <Table dataSource={dataSource} columns={columns} loading={loading} />;
    </>
  );
}

export default UserListTable;
