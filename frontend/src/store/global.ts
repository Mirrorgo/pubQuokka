import { atom } from "jotai";

enum AccountType {
  Individual = "individual",
  Organization = "organization",
}

/**
 * dataSet
 */
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

const countAtom = atom(0);
const currentUserAtom = atom({
  userId: "testUserId",
  userName: "testUserName",
  //   accountType: AccountType.Individual,
  accountType: AccountType.Organization,
  organizationId: "testOrganizationId",
  organizationName: "testOrganizationName",
});

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

export { countAtom, currentUserAtom, currentDataSetAtom };
export { AccountType };
export type { BaseResponse, DataSet };
