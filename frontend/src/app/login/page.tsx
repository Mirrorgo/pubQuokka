"use client";
import { Button, Checkbox, Col, Form, Image, Input, Row } from "antd";
import React, { FC, useState } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";

type LoginInput = {
  username: string;
  password: string;
  remember: boolean;
};
const Login: FC = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  console.log("data", data);
  const [isLogin, setIsLogin] = useState(true);
  // 67.219.111.154
  // const onFinish = (values: LoginInput) => {
  //   // console.log("Received values:", values);
  //   // TODO
  //   // axios
  //   //   .get("http://67.219.111.154:8090/api/user/login") // 替换为你的后端 API 的实际 URL
  //   //   .then((response) => {
  //   //     setData(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching data:", error);
  //   //   });
  //   // if (values.username === "admin" && values.password === "admin") {
  //   //   // router.push("/home");
  //   //   router.push("/generateForm");
  //   // }
  // };
  const onFinish = async (values: LoginInput) => {
    try {
      const response = await axios.post(
        "http://67.219.111.154:8090/api/user/login",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            "Content-Type": "application/json",
            Accept: "*/*",
            Host: "67.219.111.154:8090",
            Connection: "keep-alive",
          },
        }
      );

      // 处理登录成功的情况，这里可以根据后端返回的数据来进行逻辑处理
      console.log("Login successful:", response.data);

      // 之后你可以根据登录成功后的逻辑来跳转到其他页面
      // 例如：
      // router.push("/dashboard");
      // 或
      // router.push("/generateForm");
    } catch (error) {
      // 处理登录失败的情况
      console.error("Login error:", error);
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
              {isLogin && (
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
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
