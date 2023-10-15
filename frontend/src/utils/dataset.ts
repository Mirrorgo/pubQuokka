import { DataElement, DataItem, DataSet } from "@/store/global";

export const convertDataToObjectToTwoDimensionalArray = (data: DataItem[]) => {
  // 初始化一个空的二维数组
  const twoDimensionalArray: number[][] = [];
  // 遍历 data 数组中的对象，将每个对象的 time 和 value 属性转化为一维数组
  data.forEach((item) => {
    const oneDimensionalArray: number[] = [+item.x, +item.y];
    twoDimensionalArray.push(oneDimensionalArray);
  });

  return twoDimensionalArray;
};

export const convertTwoDimensionalArrayToDataObject = (
  twoDimensionalArray: number[][]
): DataItem[] => {
  const data: DataItem[] = [];

  // 遍历二维数组，将每个一维数组的值转化为 DataItem 对象
  twoDimensionalArray.forEach((oneDimensionalArray) => {
    const x = oneDimensionalArray[0].toString();
    const y = oneDimensionalArray[1].toString();
    const dataItem: DataItem = { x, y };
    data.push(dataItem);
  });

  return data;
};

// const getCurrentVersionDataFromDataSet = (dataSet: DataSet) => {
//   //   console.log("set", dataSet);
//   const data = dataSet.datas.find((cur, idx) => {
//     // console.log(cur.versionId, "+", currentVersionId);
//     return cur.versionId === currentVersionId;
//   })!;
//   //   console.log("data", data);
//   return convertDataToObjectToTwoDimensionalArray(data.data);
// };
// export { getCurrentVersionDataFromDataSet };
