import { BaseResponse, Model, allModelListAtom } from "@/store/global";
import { requestUrl } from "./requestUtils";
import axios from "axios";

export async function queryModelList() {
    return axios.get<BaseResponse<Model>>(
      requestUrl("/model/list", true)
    );
  }