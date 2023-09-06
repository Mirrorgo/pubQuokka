import React, { useCallback, useEffect, useState } from "react";
import DraggableLineChart from "./components/DraggableLineChart";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Space,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";

enum ActionType {
  Empty = "",
  Edit = "edit",
  Add = "add",
}

function Home() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [chartData, setChartData] = useState<number[][]>([[]]);
  const [editingDataIndex, setEditingDataIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null);
  const [actionType, setActionType] = useState<ActionType>(ActionType.Empty);
  const [addPointX, setAddPointX] = useState<number>(0);
  const [addPointY, setAddPointY] = useState<number>(0);
  const handleGoBack = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleGenerateJson = useCallback(() => {
    messageApi.success("Json has been generated and sent!");
  }, [messageApi]);

  const handleSave = () => {
    if (editingDataIndex !== null && editValue !== null) {
      const newData = [...chartData];
      newData[editingDataIndex][1] = editValue;
      setEditingDataIndex(null);
      setEditValue(null);
      setChartData(newData);
    }
  };
  const handleDelete = () => {
    if (editingDataIndex !== null) {
      const newData = [...chartData];
      newData.splice(editingDataIndex, 1);
      setEditingDataIndex(null);
      setEditValue(null);
      setChartData(newData);
    }
  };
  const handleAddPoint = () => {
    const newData = [...chartData];
    let insertIndex = newData.length;
    for (let i = 0; i < newData.length; i++) {
      const element = newData[i];
      if (element[0] !== addPointX) {
        if (element[0] > addPointX) {
          insertIndex = i;
          break;
        }
      } else {
        message.error("duplicate x  ");
        return;
      }
    }
    newData.splice(insertIndex, 0, [addPointX, addPointY]);
    setAddPointX(0);
    setAddPointY(0);
    setChartData(newData);
  };

  useEffect(() => {
    setChartData([
      [0, 10],
      [1, 20],
      [2, 30],
      [3, 40],
      [4, 50],
    ]);
    return () => {};
  }, []);
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={handleGoBack}>
        Back
      </Button>
      <Row style={{ width: "100vw", height: "500px" }}>
        <Col span={18}>
          <DraggableLineChart
            data={chartData}
            setData={setChartData}
            editingDataIndex={editingDataIndex}
            setEditingDataIndex={setEditingDataIndex}
            editValue={editValue}
            setEditValue={setEditValue}
          />
        </Col>
        <Col span={6}>
          {/* {chartData.map((point, index) => (
            <div
              key={index}
              onClick={() => {
                setEditingDataIndex(index);
                setEditValue(point[1]);
              }}
              style={{
                padding: "10px",
                backgroundColor:
                  editingDataIndex === index ? "lightgray" : "white",
                cursor: "pointer",
              }}
            >
              Data Point {index + 1}
            </div>
          ))} */}
          <Card style={{ width: "100%", height: "100%" }}>
            <Space direction="vertical">
              <Title level={3}>Edit Panel</Title>
              {editingDataIndex !== null && (
                <Space direction="vertical">
                  <Input
                    addonBefore="y:"
                    type="number"
                    value={editValue === null ? "" : editValue}
                    onChange={(e) => setEditValue(parseFloat(e.target.value))}
                  />
                  <Space>
                    <Button onClick={handleSave} type="primary">
                      Save
                    </Button>
                    <Button onClick={handleDelete} type="default">
                      Delete
                    </Button>
                  </Space>
                </Space>
              )}
              <Divider />
              <Title level={5}>New Point</Title>
              <Input
                addonBefore="x:"
                type="number"
                placeholder="x"
                value={addPointX}
                onChange={(cur) => setAddPointX(+cur.target.value)}
              />
              <Input
                addonBefore="y:"
                placeholder="y"
                type="number"
                value={addPointY}
                onChange={(cur) => setAddPointY(+cur.target.value)}
              />
              <Button
                // onClick={() => setActionType(ActionType.Add)}
                onClick={handleAddPoint}
                type="primary"
              >
                Add Point
              </Button>
              <div style={{ height: "30vh" }} />
            </Space>
          </Card>
        </Col>
      </Row>
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
