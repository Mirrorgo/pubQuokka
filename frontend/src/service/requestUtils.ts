const requestUrl = (url: string, useMock: boolean = false) => {
  const mockUrl = "https://mock.apifox.cn/m1/3120135-0-default";
  // const mockUrl = "http://67.219.111.154:8081/api";
  if (!useMock) {
    return `/api${url}`;
  } else {
    return mockUrl + url;
  }
};

export { requestUrl };
