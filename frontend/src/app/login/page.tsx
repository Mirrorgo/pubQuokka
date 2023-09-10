"use client";
import { Button, Checkbox, Col, Form, Image, Input, Row } from "antd";
import React, { FC } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

type LoginInput = {
  username: string;
  password: string;
  remember: boolean;
};

const Login: FC = () => {
  const router = useRouter();
  const onFinish = (values: LoginInput) => {
    // console.log("Received values:", values);
    // TODO 转变成真正的登录逻辑
    if (values.username === "admin" && values.password === "admin") {
      // router.push("/home");
      router.push("/generateForm");
    }
  };
  return (
    <div className={styles["main"]}>
      <Row align={"middle"} justify={"center"}>
        <Col span={12} push={2}>
          <Image src="/image/loginLeft.png" alt="试试" width={"30vw"} />
        </Col>
        <Col span={12}>
          <div className={styles.right}>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
