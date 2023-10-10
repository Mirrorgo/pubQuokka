"use client";
import { AccountType, countAtom, currentUserAtom } from "@/store/global";
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
} from "antd";
import { useAtom } from "jotai";
import React, { useState } from "react";

const { Option } = Select;
const { Text } = Typography;

function Settings() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [count, setCount] = useAtom(countAtom);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false); // 是否处于编辑模式
  const [visible, setVisible] = useState(false); // 控制弹窗可见性
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false); // 控制删除确认弹窗可见性
  const [usernameToDelete, setUsernameToDelete] = useState(""); // 存储待删除账户的用户名

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

  const handleCancel = () => {
    setIsEditing(false); // 取消编辑模式
    form.resetFields(); // 重置表单字段
    setVisible(false); // 关闭弹窗
  };
  const handleDeleteAccount = () => {
    // 显示删除确认弹窗
    setDeleteConfirmationVisible(true);
  };
  const handleDeleteConfirmation = () => {
    // 处理删除账户逻辑
    console.log("Account deleted:", usernameToDelete);
    // TODO： 顶部notification提示：删除成功
    setDeleteConfirmationVisible(false); // 关闭删除确认弹窗
  };

  const handleDeleteCancel = () => {
    // 取消删除
    setUsernameToDelete(""); // 清空输入的用户名
    setDeleteConfirmationVisible(false); // 关闭删除确认弹窗
  };

  return (
    <>
      <div>base info</div>
      <Typography.Title level={3}>User Profile Settings</Typography.Title>
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
        <Form.Item name="organizationName" label="Organization Name">
          <Text>{currentUser.organizationName}</Text>
        </Form.Item>
        <Space>
          {/* TODO: 暂时不显示这个，还没想好用来做什么 */}
          {/* <Button type="primary" onClick={handleEdit}>
            Edit Account
          </Button> */}
          <Button type="primary" danger onClick={handleDeleteAccount}>
            Delete Account
          </Button>
          <Button type="primary">invite individual</Button>
        </Space>
      </Form>

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
    </>
  );
}

export default Settings;
