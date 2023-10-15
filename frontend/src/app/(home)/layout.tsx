"use client";
import { Button, Col, Divider, Image, Row, Space } from "antd";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/global";
import { queryDataSetById } from "@/service/dataset";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const handleTest = async () => {
    // console.log(currentUser, "currentUser");
    // TODO 测试用
    const res = await queryDataSetById({
      dataSetID: "02b6d57a-110d-4a5a-8dab-128636495ed6",
    });
    console.log(res.data.data);
  };
  return (
    <section>
      <Space style={{ width: "100vw" }} className={styles.headerFont}>
        <Image src="/image/validationBlack.png" alt="icon" width="30vw" />
        <Row justify="space-around" align="middle" style={{ width: "60vw" }}>
          {/* <Col className={styles["nav-item"]}>
            <div onClick={() => router.push("/dashboard")}>Dashboard</div>
          </Col> */}
          <Button onClick={handleTest}>test</Button>
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
