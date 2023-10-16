"use client";
import { currentDataSetAtom } from "@/store/global";
import { useAtom } from "jotai";
import React from "react";

function Page({ params }: { params: { dataSetId: string } }) {
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom);
  console.log(currentDataSet,"title")
  return (
    <>
      {/* {params.dataSetId} */}
      <div>
        <div>Title: {currentDataSet.title}</div>
        <div>ModelType: {currentDataSet.modelType}</div>
        <div>Range of the Dataset: {currentDataSet.defaultBottom} ~ {currentDataSet.defaultTop}</div>
        <div>Unit: {currentDataSet.unit}</div>
      </div>
    </>
  );
}

export default Page;
