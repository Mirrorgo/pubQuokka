import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

enum AccountType {
  Individual = "individual",
  Organization = "organization",
}

type UserInfoType = {
  userId: string;
  userName: string;
  accountType: AccountType;
  organizationId?: string;
  organizationName?: string;
};

type DataSet = {
  configuration: {
    currentVersionId: string;
    /**
     * 点的数量
     */
    point: number;
    type: string;
    /**
     * 单位
     */
    unit: string;
  };
  datas: DataElement[];
  dataSetId: string;
  title: string;
};

type DataElement = {
  data: {
    time: string;
    value: string;
  }[];
  time: string;
  versionId: string;
};

interface BaseResponse<T> {
  code: number;
  msg: string;
  data: T;
}

const currentUserAtom = atomWithStorage<UserInfoType>("currentUser", {
  userId: "0",
  userName: "testUserName",
  //   accountType: AccountType.Individual,
  accountType: AccountType.Organization,
  organizationId: "testOrganizationId",
  organizationName: "testOrganizationName",
});

const currentEditingDataSetAtom = atom("0"); // 标识正在编辑的dataset,因为可能在浏览以前的datasetVersion
// 浏览以前datasetVersion的时候只支持恢复操作，不支持直接编辑
//

const currentDataSetAtom = atom({
  dataSetId: "1",
  title: "test1",
  configuration: {
    type: "Cmkqck Llar Ydgpgbvoa",
    point: 10,
    unit: "Wophgmy Rifhtxega Ngrauou Ncuttn",
    currentVersionId: "1",
  },
  datas: [
    {
      versionId: "1",
      time: "1998-08-26 17:27:53",
      data: [
        {
          time: "2014-07-29 18:25:47",
          value: "voluptate ipsum Duis",
        },
      ],
    },
  ],
});

export { currentUserAtom, currentDataSetAtom };
export { AccountType };
export type { BaseResponse, DataSet, UserInfoType };
