import { BaseResponse, DataSet } from "@/store/global";
import { requestUrl } from "./requestUtils";
import axios from "axios";

export async function queryUpdateDataSet(data: object) {
  return axios.post<BaseResponse<string>>(
    requestUrl("/dataSet/modify1", true),
    data
  );
}

export async function queryDataSetById(data: object) {
  return axios.get<BaseResponse<DataSet>>(
    requestUrl("/dataset/get", true),
    data
  );
}

export async function createDataSetByRequirement(userID: string, requestBody: Object) {
  return axios.post<BaseResponse<DataSet>>(
    requestUrl(`/dataSet/generate?userID=${userID}`,true),
    requestBody
  )
}