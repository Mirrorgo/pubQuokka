import { cache } from "react";
import "server-only";

export const preload = (id: string) => {
  void getBaseUserInfo(id);
};

export const getBaseUserInfo = cache(async (id: string) => {
  const res = await fetch(
    `https://mock.apifox.cn/m1/3120135-0-default/baseInfo?userId=${id}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
  // ...
});
