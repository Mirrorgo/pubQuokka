import { BaseResponse, DataSet, DataSetListItem } from "@/store/global";
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

export async function queryRevertDataSet(params: object) {
  return axios.post<BaseResponse<DataSet>>(
    requestUrl("/dataSet/revert"),
    null,
    { params }
  );
}

export async function createDataSetByRequirement(
  userID: string,
  requestBody: Object
) {
  return axios.post<BaseResponse<DataSet>>(
    requestUrl(`/dataSet/generate?userID=${userID}`),
    requestBody
  );
}

export async function getDataSetListByUserID(userID: string) {
  return axios.get<BaseResponse<DataSetListItem[]>>(
    requestUrl(`/dataSet/list?userID=${userID}`)
  );
}
