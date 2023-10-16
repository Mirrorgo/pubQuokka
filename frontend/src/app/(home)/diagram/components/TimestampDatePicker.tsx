import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { SetStateAction } from "jotai";

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};
// dayjs.unix(1318781876)

const TimestampDatePicker = ({
  setPoint,
}: {
  setPoint: (value: SetStateAction<number>) => void;
}) => {
  const handleChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: string
  ) => {
    setPoint(+dayjs(dateString).unix());
  };
  const [now] = useState(dayjs());

  useEffect(() => {
    setPoint(+now.unix());
  }, [now, setPoint]);

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime
        onOk={onOk}
        defaultValue={now}
        onChange={handleChange}
      />
    </Space>
  );
};
export default TimestampDatePicker;
