import { queryOptions } from "@tanstack/react-query";
import api, { BaseResponse } from ".";
import { Item } from "./item";
import { User } from "./user";

interface ExpenseResponse extends BaseResponse<ExpenseWithItem> {}
interface ExpensesResponse extends BaseResponse<Expense[]> {}

interface ExpenseWithItem extends Expense {
  items: Item[];
}

export interface Expense {
  _id: string;
  description: string;
  totalAmount: number;
  paidBy: User;
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

export type AddItem = {
  name: string;
  price?: number;
  expenseId: string;
  purchasedBy: string;
  sharedBy: string[];
  exemptedBy: string[];
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

export const addItemtoExpense = (data: AddItem) =>
  api.post(`/expenses/${data.expenseId}/items`, data);