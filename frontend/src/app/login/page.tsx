"use client";
import { Button, Col, Form, Image, Input, Row, Select, message } from "antd";
import React, { FC, useState } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AccountType, BaseResponse, currentUserAtom } from "@/store/global";
import { login, signUp } from "@/service/user";
import { MsgType } from "@/service/requestType";
import { useAtom } from "jotai";

const Login: FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.Individual
  );
  const onFinish = async (values: object) => {
    // console.log("login inputs", values);
    if (isLogin) {
      const res = await login(values);
      if (res.data.msg === MsgType.SUCCESS) {
        setCurrentUser(res.data.data);
        router.push("/dashboard");
      } else if (res.data.msg === MsgType.FAILURE) {
        message.error("invalid username or password");
      } else {
        message.error("server error");
      }
    } else {
      const res = await signUp(values);
      if (res.data.msg === MsgType.SUCCESS) {
        // router.push("/dashboard");
        message.success("Registration Success");
        setIsLogin(true);
      } else if (res.data.msg === MsgType.FAILURE) {
        message.error(res.data.data);
      } else {
        message.error("server error");
      }
    }
  };

  return (
    <div className={styles["main"]}>
      <Row align={"middle"} justify={"center"}>
        <Col span={12} push={2}>
          <Image
            src="/image/loginLeft.png"
            alt="fhir studio image"
            width={"30vw"}
          />
        </Col>
        <Col span={12}>
          <div className={styles.right}>
            <div style={{ width: "100%", height: "30px" }}>
              <div
                style={{
                  textAlign: "right",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
                onClick={() => setIsLogin((cur) => !cur)}
              >
                {isLogin ? "Sign Up" : "Log in"}
              </div>
            </div>

            <Form initialValues={{ remember: true }} onFinish={onFinish}>
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
              {!isLogin && (
                <>
                  <Form.Item name="role" label="Account Type">
                    <Select
                      defaultValue={AccountType.Individual}
                      options={[
                        { value: AccountType.Individual, label: "Individual" },
                        {
                          value: AccountType.Organization,
                          label: "Organization",
                        },
                      ]}
                      onChange={(value) => setAccountType(value)}
                    />
                  </Form.Item>
                  {accountType === AccountType.Organization && (
                    <Form.Item
                      name="organizationName"
                      label="Enter Organization Name"
                    >
                      {/* 显示输入组织名的字段 */}
                      <Input placeholder="Organization Name" />
                    </Form.Item>
                  )}
                </>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  {isLogin ? "Log in" : "Sign Up"}
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
