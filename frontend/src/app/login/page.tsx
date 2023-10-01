"use client";
import { Button, Checkbox, Col, Form, Image, Input, Row, Select } from "antd";
import React, { FC, useState } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
interface ApiResponse {
  code: number;
  msg: string;
  data: string;
}

type LoginInput = {
  username: string;
  password: string;
  remember: boolean;
};

enum AccountType {
  Individual = "individual",
  Organization = "organization",
}

const Login: FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.Individual
  );
  // 67.219.111.154
  const onFinish = (values: LoginInput) => {
    console.log("Received values:", values);
    const postValues = {
      username: values.username,
      password: values.password,
    };
    // TODO;
    axios
      // .get("http://67.219.111.154:8081/api/user/login") // 替换为你的后端 API 的实际 URL
      .post<ApiResponse>("/api/user/login", postValues) // 替换为你的后端 API 的实际 URL
      .then((response) => {
        const responseData = response.data;
        if (responseData.code === 200) {
          router.push("/dashboard");
          //   router.push("/generateForm");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
              {!isLogin && (
                <>
                  <Form.Item name="type" label="Account Type">
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
                  {accountType === AccountType.Individual ? (
                    <>
                      <Form.Item
                        name="organization"
                        label="Select Your Organization"
                      >
                        {/* 显示选择隶属的组织的字段 */}
                        <Select
                          options={[
                            { value: "org1", label: "Organization 1" },
                            { value: "org2", label: "Organization 2" },
                            // 添加更多组织选项
                          ]}
                        />
                      </Form.Item>
                    </>
                  ) : (
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
