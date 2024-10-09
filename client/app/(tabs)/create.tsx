import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import FormField from "@/components/form-field";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dropdown from "@/components/dropdown";
import CustomButton from "@/components/custom-button";
import { useLocalSearchParams } from "expo-router";

const users = [
  { _id: "1", label: "Praneeth Kumar", value: "Praneeth Kumar" },
  { _id: "2", label: "Rupesh Keesaram", value: "Rupesh Keesaram" },
];

const groups = [
  { _id: "1", label: "Roommates", value: "1" },
  { _id: "2", label: "Bengaluru", value: "2" },
];

const Create = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  console.log({ groupId });

  const [form, setForm] = useState<{
    description: string;
    totalAmount: number;
    group: string;
    paidBy: string;
  }>({
    description: "",
    totalAmount: 0,
    group: groupId ?? "",
    paidBy: "",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6">
          <Text className="text-2xl font-pbold">Add Expense</Text>

          <FormField
            title="Description"
            value={form?.description}
            placeholder="Enter Description"
            onChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Amount"
            value={form?.totalAmount.toString()}
            placeholder="Enter amount"
            onChangeText={(e) => setForm({ ...form, totalAmount: Number(e) })}
            keyboardType="number-pad"
            otherStyles="mt-7"
          />
          <Dropdown
            title="Paid By"
            placeholder="Select Member"
            options={users}
            selected={form.paidBy}
            handlePress={(value) => {
              setForm({ ...form, paidBy: value });
            }}
            containerStyles="mt-7"
          />
          {groupId ? (
            <Dropdown
              title="Group"
              placeholder="Select Group"
              options={groups}
              selected={form.group}
              handlePress={(value) => {
                setForm({ ...form, group: value });
              }}
              containerStyles="mt-7"
            />
          ) : null}
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

export default Create;
