const requestUrl = (url: string, useMock: boolean = false) => {
  const mockUrl = "https://mock.apifox.cn/m1/3120135-0-default";
  if (!useMock) {
    return `/api${url}`;
  } else {
    return mockUrl + url;
  }
};

export { requestUrl };
