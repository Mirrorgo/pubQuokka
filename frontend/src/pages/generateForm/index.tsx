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
} from "antd";
import type { SliderMarks } from "antd/es/slider";
import React, { FC, useState } from "react";
import dayjs from "dayjs";
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
  0: "0%",
  90: "90%",
  99: "99%",
};

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const GenarateForm: FC = () => {
  const router = useRouter();
  const onFinish = () => {
    router.push("/home");
  };
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
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
                onChange={onChange}
                onSearch={onSearch}
                options={[
                  {
                    value: "Blood Oxygen Saturation",
                    label: "Blood Oxygen Saturation",
                  },
                  {
                    value: "Electrocardiography",
                    label: "Electrocardiography",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Trend">
              <Select
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
            <Form.Item label="Form Layout" name="layout">
              <Radio.Group value={selectedValue}>
                <Radio.Button value="horizontal">Time Range</Radio.Button>
                <Radio.Button value="vertical">Point Num</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Range:"
              style={{ position: "relative", padding: "0px 30px" }}
            >
              <Row align={"middle"} justify={"center"}>
                <Col span={20}>
                  <Slider
                    marks={marks}
                    defaultValue={[90, 99]}
                    handleLineWidthHover={2}
                    handleLineWidth={1}
                    handleSize={6}
                    handleSizeHover={8}
                    range={{ draggableTrack: true }}
                  ></Slider>
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
                </Col>
                <Col span={1}>
                  <p>%</p>
                </Col>
              </Row>
            </Form.Item>
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
              <TimePicker defaultValue={dayjs("12:08:23", "HH:mm:ss")} />
            </Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  generate
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};

export default GenarateForm;
