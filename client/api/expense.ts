import { queryOptions } from "@tanstack/react-query";
import api, { BaseResponse } from ".";

interface ExpenseResponse extends BaseResponse<ExpenseWithItem> {}
interface ExpensesResponse extends BaseResponse<Expense[]> {}

interface ExpenseWithItem extends Expense {
  items: Item[];
}

export interface Expense {
  _id: string;
  description: string;
  totalAmount: number;
  paidBy: PaidByUser;
  sharedWith: SharedWith[];
  totalOwed: number;
  totalReturned: number;
  date: string;
}

interface SharedWith {
  _id: string;
  user: User;
  shareAmount: number;
  exemptedItems: string[];
}

interface PaidByUser {
  _id: string;
  name: string;
  email: string;
}

type Item = {
  _id: string;
  name: string;
  price: number;
  purchasedBy: string;
  sharedBy: User[];
  exemptedBy: User[];
  expense: string;
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export const expensesOptions = (userId: string) =>
  queryOptions({
    queryKey: ["expenses"],
    queryFn: () =>
      api
        .get<ExpensesResponse>(`/expenses`, {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
  });

export const expenseOptions = (id: string, userId: string) =>
  queryOptions({
    queryKey: ["expenses", id],
    queryFn: () =>
      api
        .get<ExpenseResponse>(`/expenses/${id}`, {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
  });
