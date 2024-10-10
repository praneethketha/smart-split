import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/custom-button";
import Dropdown from "@/components/dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    _id: "1",
    name: "Roommates",
    amount: 66.66,
    isGet: true,
  },
  {
    _id: "2",
    name: "Bengaluru",
    amount: 33.33,
    isGet: false,
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
            <View className="w-full h-16 px-4 bg-black/5 rounded-2xl border-2 border-gray-200 flex-row items-center">
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
