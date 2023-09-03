import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const DraggableLineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // 模拟一些数据
      const data = [
        [0, 10],
        [1, 20],
        [2, 30],
        [3, 40],
        [4, 50],
      ];

      // 创建初始的折线图
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

      // 监听拖拽结束事件，更新数据
      // myChart.on("dragend", (params: any) => {
      //   const series = myChart.getOption().series[0];
      //   const dataIndex = params.dataIndex;
      //   const coordX = params.event.offsetX;
      //   const coordY = params.event.offsetY;
      //   const newValues = myChart.convertFromPixel("grid", [coordX, coordY]);
      //   series.data[dataIndex] = newValues;
      //   myChart.setOption({
      //     series: [series],
      //   });
      // });
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default DraggableLineChart;
