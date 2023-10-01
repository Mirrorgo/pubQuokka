"use client";
import { countAtom } from "@/store/global";
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
  const [count, setCount] = useAtom(countAtom);
  const [form] = Form.useForm();
  const [accountType, setAccountType] = useState("individual");
  const [isEditing, setIsEditing] = useState(false); // 是否处于编辑模式
  const [visible, setVisible] = useState(false); // 控制弹窗可见性
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false); // 控制删除确认弹窗可见性
  const [usernameToDelete, setUsernameToDelete] = useState(""); // 存储待删除账户的用户名

  const onFinish = (values) => {
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
          <Text>{/* 显示只读的用户名 */}</Text>
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Text>{/* 显示只读的密码 */}</Text>
        </Form.Item>
        <Form.Item name="accountType" label="Account Type">
          <Text>{accountType}</Text>
        </Form.Item>
        <Form.Item name="organization" label="Organization">
          <Text>{/* 显示只读的组织 */}</Text>
        </Form.Item>
        <Space>
          <Button type="primary" onClick={handleEdit}>
            Edit Account
          </Button>
          <Button type="primary" danger onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Space>
      </Form>
      <Row justify="center">
        <Col span={12}>
          <Text strong>Your Account Type: {accountType}</Text>
        </Col>
      </Row>

      {/* 弹窗 */}
      <Modal
        title="Edit Account"
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item name="username" label="Username">
            <Input placeholder="New Username" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item name="accountType" label="Account Type">
            <Select value={accountType} onChange={setAccountType}>
              <Option value="individual">Individual</Option>
              <Option value="organization">Organization</Option>
            </Select>
          </Form.Item>
          <Form.Item name="organization" label="Organization">
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
        visible={deleteConfirmationVisible}
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
