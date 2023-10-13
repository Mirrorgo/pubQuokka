"use client";
import { AccountType, currentUserAtom, initialUser } from "@/store/global";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useAtom } from "jotai";
import React, { useState } from "react";
import UserListTable from "./components/UserListTable";
import { queryDeleteAccount } from "@/service/user";
import { useRouter } from "next/navigation";
import { MsgType } from "@/service/requestType";
import InviteUserListTable from "./components/InviteUserListTable";

const { Option } = Select;
const { Text } = Typography;

function Settings() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false); // 是否处于编辑模式
  const [visible, setVisible] = useState(false); // 控制弹窗可见性
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false); // 控制删除确认弹窗可见性
  const [usernameToDelete, setUsernameToDelete] = useState(""); // 存储待删除账户的用户名
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // TODO: 优化类型
  const onFinish = (values: any) => {
    // 处理提交逻辑，例如更新用户名、密码、组织等
    console.log("Submitted values:", values);
    setIsEditing(false); // 保存后退出编辑模式
    setVisible(false); // 关闭弹窗
  };

  const handleEdit = () => {
    setIsEditing(true); // 进入编辑模式
    setVisible(true); // 打开弹窗
  };
  const handleOpenInvite = () => {
    setIsInviteModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditing(false); // 取消编辑模式
    form.resetFields(); // 重置表单字段
    setVisible(false); // 关闭弹窗
  };
  const handleDeleteAccount = () => {
    // 显示删除确认弹窗
    setDeleteConfirmationVisible(true);
  };
  const handleDeleteConfirmation = async () => {
    // 处理删除账户逻辑
    if (usernameToDelete === currentUser.userName) {
      // TODO： 顶部notification提示：删除成功
      console.log("Account deleted:", usernameToDelete);
      // setDeleteConfirmationVisible(false); // 关闭删除确认弹窗
      const res = await queryDeleteAccount({ userId: currentUser.userId });
      if (res.data.msg === MsgType.SUCCESS) {
        console.log("response", res);
        message.success("delete successfully");
        // TODO: 一个三秒弹窗，弹窗后转入login界面
      } else {
        message.error("delete failure");
      }
    } else {
      message.error("Account does not match, please re-enter");
    }
  };
  const handleLogOut = () => {
    router.push("/login");
    setCurrentUser(initialUser);
  };

  const handleDeleteCancel = () => {
    // 取消删除
    setUsernameToDelete(""); // 清空输入的用户名
    setDeleteConfirmationVisible(false); // 关闭删除确认弹窗
  };

  return (
    <>
      <div
        style={{
          width: "60vw",
          margin: "auto",
        }}
      >
        <Typography.Title level={3}>Settings</Typography.Title>
        <Typography.Title level={5}>Base Info</Typography.Title>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item name="username" label="Username">
            <Text>{currentUser.userName}</Text>
          </Form.Item>
          <Form.Item name="accountType" label="Account Type">
            <Text>{currentUser.accountType}</Text>
          </Form.Item>
          {currentUser.organizationName && (
            <Form.Item name="organizationName" label="Organization Name">
              <Text>{currentUser.organizationName}</Text>
            </Form.Item>
          )}

          {/* TODO: 暂时不显示这个，还没想好用来做什么 */}
          {/* <Button type="primary" onClick={handleEdit}>
            Edit Account
          </Button> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button type="primary" danger onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            {currentUser.accountType === AccountType.Organization && (
              <Button type="primary" onClick={handleOpenInvite}>
                invite individual
              </Button>
            )}
            <Button onClick={handleLogOut}>Log Out</Button>
          </div>
        </Form>
      </div>
      <div style={{ height: "30px" }} />
      {currentUser.accountType === AccountType.Organization && (
        <div
          style={{
            width: "60vw",
            margin: "auto",
          }}
        >
          <UserListTable currentUser={currentUser} />
        </div>
      )}

      {/* 弹窗 */}
      <Modal
        title="Edit Account"
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="accountType"
            label="Account Type"
            initialValue={currentUser.accountType}
          >
            <Select
              value={currentUser.accountType}
              onChange={(value) =>
                setCurrentUser((pre) => ({ ...pre, accountType: value }))
              }
            >
              <Option value={AccountType.Individual}>Individual</Option>
              <Option value={AccountType.Organization}>Organization</Option>
            </Select>
          </Form.Item>
          <Form.Item name="organization" label="OrganizationName">
            <Select>
              <Option value="org1">Organization 1</Option>
              <Option value="org2">Organization 2</Option>
              {/* 添加更多组织选项 */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* 删除账户确认弹窗 */}
      <Modal
        title="Delete Account"
        open={deleteConfirmationVisible}
        onOk={handleDeleteConfirmation}
        onCancel={handleDeleteCancel}
      >
        <Input
          placeholder="Enter username to confirm deletion"
          value={usernameToDelete}
          onChange={(e) => setUsernameToDelete(e.target.value)}
        />
      </Modal>
      {/* invite弹窗 */}
      <Modal
        open={isInviteModalOpen}
        onCancel={() => setIsInviteModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        <InviteUserListTable />
      </Modal>
    </>
  );
}

export default Settings;
