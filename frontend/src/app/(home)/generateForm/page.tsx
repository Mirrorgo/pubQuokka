"use client";
import {
  Row,
  Image,
  Form,
  Radio,
  DatePicker,
  Select,
  Col,
  Slider,
  TimePicker,
  Button,
  Space,
  Tabs,
  InputNumber,
} from "antd";
import type { SliderMarks } from "antd/es/slider";
import React, { FC, useState, useEffect } from "react";
import dayjs from "dayjs";
import { queryModelList } from "@/service/model";
import { Model, allModelListAtom } from "@/store/global";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 8 },
  },
};

const marks: SliderMarks = {
  0: "0"
};

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const { TabPane } = Tabs;

const callback = (key: string) => {
  console.log(key);
};

const GenarateForm: FC = () => {
  const router = useRouter();
  const onFinish = () => {
    router.push("/home");
  };
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const onModelChange = (value: string) => {
    setDownNumber(parseInt(Object.values(allModelList)[parseInt(value)-1].defaultDown));
    setUpNumber(parseInt(Object.values(allModelList)[parseInt(value)-1].defaultUp))
    setModelUnit(Object.values(allModelList)[parseInt(value)-1].unit)
  };

  const onChange  = (value: string) => {
    console.log(`selected ${value}`);
  }
  const handleGenerateBlank = () => {
    console.log("generate blank");
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const [downNumber, setDownNumber] = useState(1);
  const [upNumber, setUpNumber] = useState(2);
  const [pointNumber, setPointNumber] = useState(10);
  const [modelUnit, setModelUnit] = useState("%");

  const handleDownNumberChange = (value: number|null) => {
    if (value !== null && value < upNumber) {
      setDownNumber(value);
    }
  };

  const handleUpNumberChange = (value: number|null) => {
    if (value !== null && value > downNumber) {
      setUpNumber(value);
    }
  };

  const handlePointNumberChange = (value: number|null) => {
    if (value !== null && value > downNumber) {
      setPointNumber(value);
    }
  }

  const [allModelList, setAllModelList] = useAtom(allModelListAtom);
  const modelArray = allModelList;
  useEffect(() => {
    async function initModelList() {
      const res = await queryModelList();
      // setAllModelList(() => ({
      //   list: [res.data.data],
      // }));
      setAllModelList((res.data.data as unknown as Model[]));
    }
    initModelList();
    
  }, []);


  // console.log(Object.values(allModelList),"111")
  // const modelOptions = Object.values(allModelList).map((options) => ({
  //   value: (options as unknown as { modelID: string }).modelID,
  //   label: (options as unknown as { modelName: string }).modelName,
  // }));
  const modelOptions = allModelList.map((options) => ({
    value: options.modelID,
    label: options.modelName
  }))

  return (
    <div>
      <Row align={"middle"} justify={"center"}>
        <Image
          src="/image/validationBlack.png"
          alt="Product Icon"
          height={"5vw"}
        ></Image>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={6}></Col>
        <Col span={12}>
          <Form {...layout} layout="horizontal" onFinish={onFinish}>
            <Form.Item label="Select Data Type">
              <Select
                showSearch
                placeholder="Select a Model Type"
                onChange={onModelChange}
                onSearch={onSearch}
                // options={[
                //   {
                //     value: "Blood Oxygen Saturation",
                //     label: "Blood Oxygen Saturation",
                //   },
                //   {
                //     value: "Electrocardiography",
                //     label: "Electrocardiography",
                //   },
                // ]}
                options={modelOptions}
              />
            </Form.Item>
            <Form.Item label="Trend">
              <Select
              // todo change it to api
                defaultValue="up"
                onChange={onChange}
                options={[
                  {
                    value: "up",
                    label: "Up",
                  },
                  {
                    value: "down",
                    label: "Down",
                  },
                  {
                    value: "random",
                    label: "Random",
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Range:"
              style={{ position: "relative", padding: "0px 30px" }}
            >
              <Row align={"middle"} justify={"center"}>
                <Col>
                {/* <p>From</p> */}
                <InputNumber
                prefix="From: "
                value={downNumber}
                onChange={handleDownNumberChange}
                max={upNumber - 1} 
                ></InputNumber>
                <a>～</a>
                <InputNumber
                prefix="to: "
                addonAfter={modelUnit}
                value={upNumber}
                onChange={handleUpNumberChange}
                min={downNumber + 1} 
                ></InputNumber>
                </Col>
                {/* <Col span={20}>
                  {/* <Slider
                    marks={marks}
                    defaultValue={[90, 99]}
                    range={{ draggableTrack: true }}
                  ></Slider> */}
                  {/* <Slider
                    marks={marks}
                    defaultValue={[90, 99]}
                    handleLineWidthHover={2}
                    handleLineWidth={1}
                    handleSize={6}
                    handleSizeHover={8}
                    range={{ draggableTrack: true }}
                  ></Slider> */}
                  {/* <Slider
                    marks={marks}
                    defaultValue={[90, 99]}
                    dotsize={4}
                    handleLineWidthHover={2}
                    handleLineWidth={1}
                    handleSize={6}
                    handleSizeHover={8}
                    range={{ draggableTrack: true }}
                  ></Slider> */}
                {/* </Col>
                <Col span={1}>
                  <p>%</p>
                </Col> */}
              </Row>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={2}></Col>
        <Col span={20}>
          <Form {...layout} layout="horizontal" style={{}}>
            <Form.Item label="Generate Mode">
              <Tabs defaultActiveKey="1" onChange={callback} type="card">
                <TabPane tab="Time Range" key="1">
                  <Form>
                    <Form.Item label="Time Range:">
                      <RangePicker
                        defaultValue={[
                          dayjs("2023/09/07", dateFormat),
                          dayjs("2023/09/08", dateFormat),
                        ]}
                        format={dateFormat}
                      />
                    </Form.Item>
                    <Form.Item label="Step:">
                      <TimePicker
                        defaultValue={dayjs("12:08:23", "HH:mm:ss")}
                      />
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="Point Num" key="2">
                  <Form>
                    <Form.Item label="Time Range:">
                      <RangePicker
                        defaultValue={[
                          dayjs("2023/09/07", dateFormat),
                          dayjs("2023/09/08", dateFormat),
                        ]}
                        format={dateFormat}
                      />
                    </Form.Item>
                    <Form.Item label="Points:">
                      <InputNumber
                      value={pointNumber}
                      onChange={handlePointNumberChange}
                      ></InputNumber>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </Form.Item>

            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Generate
                </Button>
              </Col>
              <Col>
                {/* TODO get a blank chart */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Generate Blank
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default GenarateForm;
