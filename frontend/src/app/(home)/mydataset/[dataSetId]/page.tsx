"use client";
import { currentDataSetAtom } from "@/store/global";
import { useAtom } from "jotai";
import React from "react";

function Page({ params }: { params: { dataSetId: string } }) {
  const [currentDataSet, setCurrentDataSet] = useAtom(currentDataSetAtom);
  return (
    <>
      testPage{params.dataSetId}
      <div>
        <div>{currentDataSet.title}</div>
        <div>{currentDataSet.configuration.type}</div>
      </div>
    </>
  );
}

export default Page;
