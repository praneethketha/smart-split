import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import FormField from "@/components/form-field";
import Dropdown from "@/components/dropdown";
import CustomButton from "@/components/custom-button";
import { useLocalSearchParams } from "expo-router";
import MultiSelect from "@/components/multi-select";

const users = [
  { _id: "1", label: "Praneeth Kumar", value: "Praneeth Kumar" },
  { _id: "2", label: "Rupesh Keesaram", value: "Rupesh Keesaram" },
];

const expenses = [
  {
    _id: "66fcf2673a9d0731f8d976b2",
    description: "Grocesory shopping",
    totalAmount: 20,
    tax: 0,
    discount: 0,
    paidBy: {
      _id: "66fce27a8e99193566b4a309",
      name: "rupesh",
      email: "rupesh@gmail.com",
    },
    group: "66fce2f78e99193566b4a30c",
    date: "2024-10-02T07:12:39.607Z",
    sharedWith: [
      {
        user: "66fce27a8e99193566b4a309",
        shareAmount: 5.833333333333333,
        exemptedItems: ["Yogurt"],
        _id: "66fd333dbed4382ea873456d",
      },
      {
        user: "66fce2031b0b342948054021",
        shareAmount: 8.333333333333332,
        exemptedItems: [],
        _id: "66fd333dbed4382ea873456e",
      },
      {
        user: "66fce78ab5a4cbac4732c337",
        shareAmount: 5.833333333333333,
        exemptedItems: ["Milk"],
        _id: "66fd333dbed4382ea873456f",
      },
    ],
    createdAt: "2024-10-02T07:12:39.608Z",
    __v: 3,
  },
];

const AddItem = () => {
  const { expenseId } = useLocalSearchParams<{ expenseId: string }>();

  const [form, setForm] = React.useState<{
    name: string;
    price: number;
    expenseId: string;
    purchasedBy: string;
    sharedBy: string[];
    exemptedBy: string[];
  }>({
    name: "",
    price: 0,
    expenseId: expenseId,
    purchasedBy: "",
    sharedBy: [],
    exemptedBy: [],
  });

  const handleMultiSelect = (
    name: "sharedBy" | "exemptedBy",
    value: string
  ) => {
    const currentValue = form[name];
    let finalValue: string[];

    if (currentValue.includes(value)) {
      finalValue = currentValue.filter((item) => item !== value);
    } else {
      finalValue = [...currentValue, value];
    }

    setForm({ ...form, [name]: finalValue });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6">
          <Text className="text-2xl font-pbold">Add Expense</Text>

          <Dropdown
            title="Expense"
            placeholder="Select Expense"
            options={expenses.map((expense) => ({
              label: expense.description,
              value: expense._id,
            }))}
            selected={form.expenseId}
            handlePress={(value) => {
              setForm({ ...form, expenseId: value });
            }}
            containerStyles="mt-7"
          />
          <FormField
            title="Description"
            value={form?.name}
            placeholder="Enter Description"
            onChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Amount"
            value={form?.price.toString()}
            placeholder="Enter amount"
            onChangeText={(e) => setForm({ ...form, price: Number(e) })}
            keyboardType="number-pad"
            otherStyles="mt-7"
          />
          <Dropdown
            title="Purchased By"
            placeholder="Select Member"
            options={users}
            selected={form.purchasedBy}
            handlePress={(value) => {
              setForm({ ...form, purchasedBy: value });
            }}
            containerStyles="mt-7"
          />
          <MultiSelect
            title="Shared By"
            placeholder="Select Member"
            options={users}
            selected={form.sharedBy}
            handlePress={(value) => handleMultiSelect("sharedBy", value)}
            containerStyles="mt-7"
            createNewLink="/groups"
          />
          <MultiSelect
            title="Exempted By"
            placeholder="Select Member"
            options={users}
            selected={form.exemptedBy}
            handlePress={(value) => handleMultiSelect("exemptedBy", value)}
            containerStyles="mt-7"
            createNewLink="/groups"
          />
          <CustomButton
            title="Save"
            handlePress={() => {}}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddItem;
