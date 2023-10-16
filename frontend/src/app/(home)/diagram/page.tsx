"use client";
import { useCallback, useEffect, useState } from "react";
import DraggableLineChart from "./components/DraggableLineChart";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  message,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { currentDataSetAtom, currentEditingDataSetAtom } from "@/store/global";
// import { getCurrentVersionDataFromDataSet } from "@/utils/dataset";
import {
  queryDataSetById,
  queryRevertDataSet,
  queryUpdateDataSet,
} from "@/service/dataset";
import { MsgType } from "@/service/requestType";
import {
  convertDataToObjectToTwoDimensionalArray,
  convertTwoDimensionalArrayToDataObject,
} from "@/utils/dataset";
import TimestampDatePicker from "./components/TimestampDatePicker";
// import Title from "antd/es/typography/Title";
// import Title from "antd/es/skeleton/Title";
const { Title, Paragraph, Text, Link } = Typography;

enum ActionType {
  Empty = "",
  Edit = "edit",
  Add = "add",
}

function Diagram() {
  const router = useRouter();
  const [chartData, setChartData] = useState<number[][]>([[]]); // all图表上的数据点
  const [editingDataIndex, setEditingDataIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null); //edit point的时候y的值
  const [actionType, setActionType] = useState<ActionType>(ActionType.Empty);
  // addpoint
  const [addPointX, setAddPointX] = useState<number>(0);
  const [addPointY, setAddPointY] = useState<number>(0);
  const [editingVersionId] = useAtom(currentEditingDataSetAtom); //读取到正在读取的版本id
  // view只能revert
  const [status, setStatus] = useState<"view" | "edit">("view");
  const [title, setTitle] = useState("");
  const [boundary, setBoundary] = useState({
    max: 0,
    min: 0,
  });

  useEffect(() => {
    if (editingVersionId === "0") {
      setStatus("edit");
    } else {
      setStatus("view");
    }
  }, [editingVersionId]);

  const handleUpdateDataSet = async () => {
    const res = await queryUpdateDataSet({
      // dataSetId: currentDataSet.dataSetId,
      dataSetID: "61b71025-d49d-4745-86ac-7272eb7bbcf1",
      dataSet: convertTwoDimensionalArrayToDataObject(chartData),
      title: title,
    });
    if (res.data.msg === MsgType.SUCCESS) {
      // console.log("ooo", res.data.data);
      message.success("update dataset successfully");
      // handleGoBack();
    } else {
      message.error(res.data.msg);
    }
    console.log("dataset", chartData, title);
  };
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom);
  // init Chart data
  // TODO:去掉try catch
  // useEffect(() => {
  //   // setCurrentDataSet(initialDataSet);
  //   try {
  //     // TODO: 需要改成从currentEditingDataSetAtom获取editing version
  //     const initial = getCurrentVersionDataFromDataSet(currentDataSet);
  //     // console.log("ini", initial);
  //     setChartData(initial);
  //   } catch (error) {
  //     setChartData([
  //       [1, 10],
  //       [2, 20],
  //     ]);
  //   }
  // }, [currentDataSet]);

  // TODO 临时的初始化dataset方法
  useEffect(() => {
    async function initDataSet() {
      console.log("2");
      const res = await queryDataSetById({
        dataSetID: "61b71025-d49d-4745-86ac-7272eb7bbcf1",
      });
      console.log(res.data.data, "1");
      if (res.data.msg === MsgType.SUCCESS) {
        setCurrentDataSet(res.data.data);
        const initData = res.data.data;
        const datas = initData.dataSetData;
        const { length } = datas;
        const newChartData = convertDataToObjectToTwoDimensionalArray(
          datas[length - 1].dataSet
        ).sort((a, b) => a[0] - b[0]);
        setTitle(res.data.data.title);
        setChartData(newChartData);
        setBoundary({
          max: +initData.defaultTop,
          min: +initData.defaultBottom,
        });
        // if (datas) console.log(res.data.data.dataSetData, "new");
      }
    }
    initDataSet();
  }, [setCurrentDataSet]);

  const handleSave = () => {
    if (editingDataIndex !== null && editValue !== null) {
      const newData = [...chartData];
      newData[editingDataIndex][1] = editValue;
      setEditingDataIndex(null);
      setEditValue(null);
      setChartData(newData);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleRevert = async () => {
    const res = await queryRevertDataSet({
      dataSetId: currentDataSet.dataSetId,
      currentVersionId: editingVersionId,
    });
    if (res.data.msg === MsgType.SUCCESS) {
      message.success("revert success");
    } else {
      message.error(res.data.msg);
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
    console.log("look", newData);
    setAddPointX(0);
    setAddPointY(0);
    setChartData(newData);
  };

  return (
    <>
      <Space size="large">
        <Button type="primary" onClick={handleGoBack}>
          Back
        </Button>
        <Input
          style={{ width: "30vw" }}
          value={title}
          onChange={handleChangeTitle}
        />
      </Space>
      <Row style={{ width: "100vw", height: "500px" }}>
        <Col span={18}>
          <DraggableLineChart
            data={chartData}
            setData={setChartData}
            editingDataIndex={editingDataIndex}
            setEditingDataIndex={setEditingDataIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            boundary={boundary}
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

          {status === "edit" ? (
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
                <Row gutter={[8, 0]} align="middle">
                  <Col>
                    <span>x:</span>
                  </Col>
                  <Col flex="auto">
                    {/* <Input
                      type="number"
                      placeholder="x"
                      value={addPointX}
                      onChange={(e) => setAddPointX(+e.target.value)}
                    /> */}
                    <TimestampDatePicker setPoint={setAddPointX} />
                  </Col>
                </Row>

                <Row gutter={[8, 0]} align="middle">
                  <Col>
                    <span>y:</span>
                  </Col>
                  <Col flex="auto">
                    <Input
                      placeholder="y"
                      type="number"
                      value={addPointY}
                      onChange={(e) => setAddPointY(+e.target.value)}
                    />
                  </Col>
                </Row>
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
          ) : (
            <Button onClick={handleRevert}>Revert</Button>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button type="primary" onClick={handleUpdateDataSet}>
            update dataset
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Diagram;
