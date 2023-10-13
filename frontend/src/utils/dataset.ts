import { DataElement, DataItem, DataSet } from "@/store/global";

const convertDataToObjectToTwoDimensionalArray = (data: DataItem[]) => {
  // 初始化一个空的二维数组
  const twoDimensionalArray: number[][] = [];
  // 遍历 data 数组中的对象，将每个对象的 time 和 value 属性转化为一维数组
  data.forEach((item) => {
    const oneDimensionalArray: number[] = [+item.x, +item.y];
    twoDimensionalArray.push(oneDimensionalArray);
  });

  return twoDimensionalArray;
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
