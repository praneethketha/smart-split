import { queryOptions } from "@tanstack/react-query";
import api, { BaseResponse } from ".";
import { Expense } from "./expense";

interface GroupResponse extends BaseResponse<Group> {}
interface GroupsResponse extends BaseResponse<GroupWithBalance[]> {}

interface GroupWithBalance extends Group {
  totalOwed: number;
  totalReturned: number;
}

interface Group {
  _id: string;
  name: string;
  members: Member[];
  createdAt: string;
  expenses: Expense[];
}

interface Member {
  _id: string;
  name: string;
  email: string;
  expensesPaid: string[];
  expensesOwed: string[];
  createdAt: string;
  balance: number;
}

export const groupsOptions = (userId: string) =>
  queryOptions({
    queryKey: ["groups"],
    queryFn: () =>
      api
        .get<GroupsResponse>(`/groups`, {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
  });

export const groupOptions = (id: string, userId: string) =>
  queryOptions({
    queryKey: ["groups", id],
    queryFn: () =>
      api
        .get<GroupResponse>(`/groups/${id}`, {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
  });
