import { MsgType } from "@/service/requestType";
import {
  queryIndividualsWithoutOrganization,
  queryInviteIndividualToOrganization,
} from "@/service/user";
import { currentDataSetAtom, currentUserAtom } from "@/store/global";
import { Space, Table, message } from "antd";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

type UserItem = {
  userId: string;
  username: string;
};
const username = "username";

function InviteUserListTable() {
  const [currentUser] = useAtom(currentUserAtom);
  const handleInvite = async (record: UserItem) => {
    console.log("record", record, currentUser.organizationId);
    const res = await queryInviteIndividualToOrganization({
      userId: record.userId,
      organizationId: currentUser.organizationId,
    });
    if (res.data.msg === MsgType.SUCCESS) {
      message.success("invite success");
    } else {
      message.error(res.data.data);
    }
  };
  useEffect(() => {
    // 通过destroy on close来实现每次打开重新请求
    async function fetch() {
      const res = await queryIndividualsWithoutOrganization();
      if (res.data.msg === MsgType.SUCCESS) {
        setDataSource(res.data.data);
      }
      console.log(res.data.data);
    }

    fetch();
  }, []);
  const [dataSource, setDataSource] = useState<
    { userId: string; username: string }[]
  >([]);

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
          <a onClick={() => handleInvite(record)}>Invite</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}

export default InviteUserListTable;
