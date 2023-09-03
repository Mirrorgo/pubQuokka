import React, { useCallback } from "react";
import DraggableLineChart from "./components/DraggableLineChart";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleGoBack = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleGenerateJson = useCallback(() => {
    messageApi.success("Json has been generated and sent!");
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={handleGoBack}>
        Back
      </Button>
      <Row justify="center">
        <Col>
          <Button type="primary">Edit</Button>
          <Button>Add</Button>
        </Col>
      </Row>
      <div style={{ width: "100vw", height: "500px" }}>
        <DraggableLineChart />
      </div>
      <Row justify="center">
        <Col>
          <Button type="primary" onClick={handleGenerateJson}>
            Generate json
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Home;
