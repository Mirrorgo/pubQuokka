import { atom } from "jotai";

enum AccountType {
  Individual = "individual",
  Organization = "organization",
}

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

export { countAtom, currentUserAtom };
export { AccountType };
export type { BaseResponse };
