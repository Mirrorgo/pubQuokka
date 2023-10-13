import { AccountType, BaseResponse, UserInfoType } from "@/store/global";
import axios from "axios";
import { requestUrl } from "./requestUtils";

// https://app.apifox.com/link/project/3120135/apis/api-111111014
export async function login(data: object) {
  return axios.post<BaseResponse<UserInfoType>>(
    requestUrl("/user/login"),
    data
  );
}
/* 
   // axios
    //   .post<BaseResponse<string>>("/api/user/login", postValues) // 替换为你的后端 API 的实际 URL
    //   .then((response) => {
    //     const responseData = response.data;
    //     if (responseData.code === 200) {
    //       router.push("/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
*/
// https://app.apifox.com/link/project/3120135/apis/api-110193884
export async function signUp(data: object) {
  return axios.post<BaseResponse<string>>(requestUrl("/user/register"), data);
}

export async function queryDeleteAccount(data: object) {
  return axios.post<BaseResponse<string>>(requestUrl("/user/delete"), data);
}

export async function queryDeleteMember(data: object) {
  return axios.post<BaseResponse<string>>(
    requestUrl("/user/deleteUserFromOrganization"),
    data
  );
}

export async function queryIndividualsWithoutOrganization() {
  return axios.get<BaseResponse<{ userId: string; username: string }[]>>(
    requestUrl("/user/individualsWithoutOrganization/list")
  );
}

export async function queryInviteIndividualToOrganization(data: object) {
  return axios.post<BaseResponse<string>>(requestUrl("/user/invite"), data);
}
