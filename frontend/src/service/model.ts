import { BaseResponse, DataSet } from "@/store/global";
import { requestUrl } from "./requestUtils";
import axios from "axios";

export async function queryModelList(data: object) {
    return axios.post<BaseResponse<string>>(
      requestUrl("/model/list", true),
      data
    );
  }