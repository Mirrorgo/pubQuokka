import { BaseResponse, DataSet, DataSetList } from "@/store/global";
import { requestUrl } from "./requestUtils";
import axios from "axios";

export async function queryUpdateDataSet(data: object) {
  return axios.post<BaseResponse<string>>(requestUrl("/dataSet/modify"), data);
}

export async function queryDataSetById(params: object) {
  return axios.get<BaseResponse<DataSet>>(requestUrl("/dataSet/get"), {
    params,
  });
}

export async function queryRevertDataSet(data: object) {
  return axios.get<BaseResponse<DataSet>>(
    requestUrl("/dataSet/revert", true),
    data
  );
}

export async function createDataSetByRequirement(userID: string, requestBody: Object) {
  return axios.post<BaseResponse<DataSet>>(
    requestUrl(`/dataSet/generate?userID=${userID}`,true),
    requestBody
  )
}

export async function getDataSetListByUserID(userID:string) {
  return axios.get<BaseResponse<DataSetList>>(
    requestUrl(`/dataSet/list?userID=${userID}`,true)
  )
}