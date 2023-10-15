import { atom,useAtom } from "jotai";
import { atomWithStorage  } from "jotai/utils";

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
  dataSetData: DataElement[];
  dataSetId: string;
  defaultBottom: string;
  defaultTop: string;
  modelType: string;
  title: string;
  unit: string;
};
type DataElement = {
  createdTime: string;
  dataSet: DataItem[];
  versionID: string;
};

type DataItem = {
  x: string;
  y: string;
};

type Model = {
  modelID: string;
  modelType: string;
  defaultUp: string;
  defaultDown: string;
  unit: string;
};

interface BaseResponse<T> {
  code: number;
  msg: string;
  data: T;
}
export const initialUser = {
  userId: "0",
  userName: "testUserName",
  accountType: AccountType.Individual,
  organizationId: "testOrganizationId",
  organizationName: "testOrganizationName",
};

const currentUserAtom = atomWithStorage<UserInfoType>(
  "currentUser",
  initialUser
);

const currentEditingDataSetAtom = atom("0"); // 标识正在编辑的dataset,因为可能在浏览以前的datasetVersion
// 浏览以前datasetVersion的时候只支持恢复操作，不支持直接编辑
//

// export const initialDataSet = {
//   dataSetId: "1",
//   title: "test1",
//   configuration: {
//     type: "type0",
//     unit: "%",
//     currentVersionId: "1",
//   },
//   datas: [
//     {
//       versionId: "1",
//       time: "1998-08-26 17:27:53",
//       data: [
//         // [0, 10],
//         // [1, 20],
//         // [2, 30],
//         // [3, 40],
//         // [4, 50],
//         {
//           time: 1,
//           value: 10,
//         },
//         {
//           time: 2,
//           value: 20,
//         },
//         {
//           time: 3,
//           value: 30,
//         },
//         {
//           time: 4,
//           value: 40,
//         },
//         {
//           time: 5,
//           value: 50,
//         },
//       ],
//     },
//   ],
// };

const currentDataSetAtom = atomWithStorage<DataSet>("currentDataSet", {
  dataSetId: "1",
  title: "test1",
  modelType: "",
  defaultTop: "",
  defaultBottom: "",
  unit: "",
  dataSetData: [
    {
      versionID: "1",
      createdTime: "1998-08-26 17:27:53",
      dataSet: [
        {
          x: "2014-07-29 18:25:47",
          y: "20",
        },
      ],
    },
  ],
});

// const allModelListAtom = atomWithStorage<Model>('ModelList', {
//   modelID: "",
//   modelName: "",
//   defaultUp: "",
//   defaultDown: "",
//   unit: ""
// });
const allModelListAtom = atomWithStorage<Model[]>('ModelList', []);

const blankDataSetAtom = atomWithStorage<DataSet>("blankDataSet", {
  dataSetId: "1",
  title: "test1",
  modelType: "",
  defaultTop: "",
  defaultBottom: "",
  unit: "",
  dataSetData: [
    {
      versionID: "1",
      createdTime: "1998-08-26 17:27:53",
      dataSet: [],
    },
  ],
});




export { currentUserAtom, currentDataSetAtom, allModelListAtom, blankDataSetAtom };
export { AccountType };
export type { BaseResponse, DataSet, UserInfoType, DataElement, DataItem, Model };
