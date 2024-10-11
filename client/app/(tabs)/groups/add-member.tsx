import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/custom-button";
import Dropdown from "@/components/dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const members = [
  {
    _id: "1",
    name: "Praneeth Kumar",
  },
  {
    _id: "2",
    name: "Rupesh Kumar",
  },
];

const data = [
  {
    _id: "66fce2f78e99193566b4a30c",
    name: "Roommates",
    members: [
      {
        _id: "66fce2031b0b342948054021",
        name: "praneeth",
        email: "praneeth@gmail.com",
        password: "Password",
        expensesPaid: [],
        expensesOwed: ["66fcf2673a9d0731f8d976b2"],
        createdAt: "2024-10-02T06:02:43.123Z",
        __v: 2,
        balance: 8.333333333333332,
      },
      {
        _id: "66fce27a8e99193566b4a309",
        name: "rupesh",
        email: "rupesh@gmail.com",
        password: "Password",
        expensesPaid: ["66fcf2673a9d0731f8d976b2"],
        expensesOwed: [],
        createdAt: "2024-10-02T06:04:42.771Z",
        __v: 2,
        balance: -5.833333333333333,
      },
      {
        _id: "66fce78ab5a4cbac4732c337",
        name: "harsha",
        email: "harsha@gmail.com",
        password: "Password",
        expensesPaid: [],
        expensesOwed: ["66fcf2673a9d0731f8d976b2"],
        createdAt: "2024-10-02T06:26:18.434Z",
        __v: 2,
        balance: 5.833333333333333,
      },
    ],
    createdAt: "2024-10-02T06:06:47.282Z",
    __v: 4,
    expenses: ["66fcf2673a9d0731f8d976b2"],
  },
];

const AddMember = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const groupInfo = data.find((group) => group._id === groupId);

  const [user, setUser] = React.useState<string>("");

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6">
          <View className="gap-4 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text className="text-2xl font-pbold">Add Member</Text>
          </View>
          <View className="mt-7 space-y-1">
            <Text className="text-base text-black-100 font-pmedium">Group</Text>
            <View className="w-full h-16 px-4 bg-black/5 rounded-2xl border-2 border-black/5 flex-row items-center">
              <Text className="font-pregular text-black/50">
                {groupInfo?.name}
              </Text>
            </View>
          </View>
          <Dropdown
            title="User"
            placeholder="Select User"
            options={members.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            selected={user}
            handlePress={(value) => {
              setUser(value);
            }}
            containerStyles="mt-7"
          />
          <CustomButton
            title="Add Now"
            handlePress={() => {}}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMember;
