"use client";
import { Button, Col, Divider, Image, Row, Space } from "antd";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/global";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  return (
    <section>
      <Space style={{ width: "100vw" }} className={styles.headerFont}>
        <Image src="/image/validationBlack.png" alt="icon" width="30vw" />
        <Row justify="space-around" align="middle" style={{ width: "60vw" }}>
          {/* <Col className={styles["nav-item"]}>
            <div onClick={() => router.push("/dashboard")}>Dashboard</div>
          </Col> */}
          <Button
            onClick={() => {
              console.log(currentUser, "currentUser");
            }}
          >
            test
          </Button>
          <Col
            className={styles["nav-item"]}
            onClick={() => router.push("/generateForm")}
          >
            Generation
          </Col>
          <Col
            className={styles["nav-item"]}
            onClick={() => router.push("/mydataset/0")}
          >
            My DataSet
          </Col>
          <Col
            className={styles["nav-item"]}
            onClick={() => router.push("/settings")}
          >
            Settings
          </Col>
        </Row>
      </Space>
      <Divider style={{ margin: "0" }} />
      <div className={styles.container}>{children}</div>
    </section>
  );
}
