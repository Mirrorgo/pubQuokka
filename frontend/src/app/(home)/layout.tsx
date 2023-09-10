import { Col, Divider, Image, Row, Space } from "antd";
import styles from "./layout.module.scss";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Space style={{ width: "100vw" }} className={styles.headerFont}>
        <Image src="/image/validationBlack.png" alt="icon" width="30vw" />
        <Row justify="space-around" align="middle" style={{ width: "60vw" }}>
          <Col className={styles["nav-item"]}>Dashboard</Col>
          <Col className={styles["nav-item"]}>Generation</Col>
          <Col className={styles["nav-item"]}>My DataSet</Col>
          <Col className={styles["nav-item"]}>Settings</Col>
        </Row>
      </Space>
      <Divider style={{ margin: "0" }} />
      {children}
    </section>
  );
}
