import { FC, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface DraggableLineChartProps {
  data: number[][]; // 所有data的值
  setData: React.Dispatch<React.SetStateAction<number[][]>>;
  editingDataIndex: number | null;
  setEditingDataIndex: React.Dispatch<React.SetStateAction<number | null>>;
  editValue: number | null;
  setEditValue: React.Dispatch<React.SetStateAction<number | null>>;
  boundary: {
    max: number;
    min: number;
  };
}
// const boundary = {
//   max: 70,
//   min: 5,
// };

const DraggableLineChart: FC<DraggableLineChartProps> = ({
  data,
  setData,
  editingDataIndex,
  setEditingDataIndex,
  editValue,
  setEditValue,
  boundary,
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
          scale: true, // 启用自适应横轴坐标轴
        },
        yAxis: {
          type: "value",
          // TODO: 优化到与实际值相关,因为可能会超出范围
          max: boundary.max * 1.1,
          min: Math.min(boundary.min - boundary.max * 0.1, 0),
        },
        series: [
          {
            markLine: {
              data: [
                {
                  yAxis: boundary.max, // 上限值
                  // lineStyle: {
                  //   color: "red",
                  // },
                  label: {
                    position: "end",
                    formatter: `Upper Limit: ${boundary.max}`,
                  },
                },
                {
                  yAxis: boundary.min, // 下限值
                  // lineStyle: {
                  //   color: "green",
                  // },
                  label: {
                    position: "end",
                    formatter: `Lower Limit: ${boundary.min}`,
                  },
                },
              ],
            },
            markArea: {
              data: [
                [
                  {
                    yAxis: boundary.max, // 标记区域的上限值
                  },
                  {
                    yAxis: boundary.min, // 标记区域的下限值
                  },
                ],
              ],
              itemStyle: {
                color: "rgba(0, 128, 0, 0.1)", // 标记区域的填充颜色
              },
            },
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
