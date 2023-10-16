"use client";
import { currentDataSetAtom } from "@/store/global";
import { useAtom } from "jotai";
import React from "react";

function Page({ params }: { params: { dataSetId: string } }) {
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom);
  console.log(currentDataSet,"title")
  return (
    <>
      {params.dataSetId}
      <div>
        <div>{currentDataSet.title}</div>
        <div>{currentDataSet.modelType}</div>
      </div>
    </>
  );
}

export default Page;
