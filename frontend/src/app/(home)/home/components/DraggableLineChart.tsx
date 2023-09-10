import { FC, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface DraggableLineChartProps {
  data: number[][]; // 所有data的值
  setData: React.Dispatch<React.SetStateAction<number[][]>>;
  editingDataIndex: number | null;
  setEditingDataIndex: React.Dispatch<React.SetStateAction<number | null>>;
  editValue: number | null;
  setEditValue: React.Dispatch<React.SetStateAction<number | null>>;
}

const DraggableLineChart: FC<DraggableLineChartProps> = ({
  data,
  setData,
  editingDataIndex,
  setEditingDataIndex,
  editValue,
  setEditValue,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const updateChart = (newData: [number, number][]) => {
        if (myChart) {
          const optionUpdate = {
            series: [
              {
                data: newData,
              },
            ],
          };
          myChart.setOption(optionUpdate);
        }
      };

      const option = {
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            data: data,
            symbol: "circle",
            symbolSize: 10,
            label: {
              show: true,
              formatter: function (params: any) {
                return params.value.join(", ");
              },
            },
            draggable: true,
            emphasis: {
              label: {
                show: true,
                formatter: function (params: any) {
                  return params.value.join(", ");
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      myChart.on("click", function (params) {
        console.log(params, "params");
        console.log(params.componentType, "type");
        setEditingDataIndex(params.dataIndex);
        setEditValue(data[params.dataIndex][1]);
        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      });

      return () => {
        myChart.dispose();
      };
    }
  }, [data, setEditValue, setEditingDataIndex]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default DraggableLineChart;
