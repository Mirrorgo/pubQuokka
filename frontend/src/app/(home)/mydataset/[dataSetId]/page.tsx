"use client";
import { currentDataSetAtom } from "@/store/global";
import { useAtom } from "jotai";
import React from "react";
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

function Page({ params }: { params: { dataSetId: string } }) {
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom);
  console.log(currentDataSet,"title")
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ModelType',
      children: currentDataSet.modelType,
    },
    {
      key: '2',
      label: 'Range of the Dataset',
      children: currentDataSet.defaultBottom + "~" + currentDataSet.defaultTop,
    },
    {
      key: '3',
      label: 'Unit',
      children: currentDataSet.unit,
    },
    {
      key: '4',
      label: 'Number of points',
      children: currentDataSet.dataSetData[currentDataSet.dataSetData.length-1]?.dataSet?.length || 0,
    },
  ];
  return (
    <>
      {/* {params.dataSetId} */}
      <div>
        {/* <div>Title: {currentDataSet.title}</div>
        <div>ModelType: {currentDataSet.modelType}</div>
        <div>Range of the Dataset: {currentDataSet.defaultBottom} ~ {currentDataSet.defaultTop}</div>
        <div>Unit: {currentDataSet.unit}</div> */}
        <Descriptions title={currentDataSet.title} items={items} ></Descriptions>
      </div>
    </>
  );
}

export default Page;
