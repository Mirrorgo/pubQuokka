const formatData = ({ timestamp }: { timestamp: string }) => {
  const date = new Date(+timestamp * 1000); // 将时间戳转换为毫秒
  // 现在你可以从Date对象中获取各种日期和时间信息
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以需要加1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 构建你想要的时间格式
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedTime;
};
export { formatData };
