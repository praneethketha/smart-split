import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { router } from "expo-router";

const data = {
  _id: "66fce78ab5a4cbac4732c337",
  name: "harsha",
  email: "harsha@gmail.com",
  expensesPaid: [],
  expensesOwed: [
    {
      _id: "66fcf2673a9d0731f8d976b2",
      description: "Grocesory shopping",
      totalAmount: 20,
      tax: 0,
      discount: 0,
      paidBy: "66fce27a8e99193566b4a309",
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
  ],
  createdAt: "2024-10-02T06:26:18.434Z",
  __v: 2,
  balance: 5.833333333333333,
};

const groups = [
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

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(data.name);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full px-4 my-6 justify-between flex-1">
        <View className="w-full flex-1 space-y-6">
          <Text className="text-2xl font-pbold">Profile</Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <View className="w-12 h-12 bg-orange-500 rounded-full justify-center items-center">
                <Text className="text-white font-pmedium text-lg">
                  {data.name
                    .split(" ")
                    .reduce((acc, curr) => (acc += curr[0]), "")}
                </Text>
              </View>
              <View>
                <Text className="font-pmedium text-xl">{data.name}</Text>
                <Text className="font-pregular text-black-200">
                  {data.email}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="edit" size={24} />
              </TouchableOpacity>
              <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet"
              >
                <View className="flex-1">
                  <View className="flex-row gap-4 items-center p-4">
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                      <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                    <Text className="font-pmedium text-lg">Edit Profile</Text>
                  </View>
                  <View className="flex-1 px-4">
                    <FormField
                      title="Name"
                      value={name}
                      placeholder="Enter name"
                      onChangeText={setName}
                      otherStyles="mt-7 h-24"
                    />
                    <CustomButton
                      title="Save"
                      containerStyles="mt-7"
                      handlePress={() => {}}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          {groups.length ? (
            <View className="flex-1 space-y-4">
              <Text className="text-lg font-psemibold text-black-200">
                Groups
              </Text>
              <FlatList
                data={groups}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <CardLinkWrapper _id={item._id} baseURL="/group">
                    <Card {...item} index={index} />
                  </CardLinkWrapper>
                )}
              />
            </View>
          ) : (
            <View className="space-y-6 items-center justify-center">
              <Text className="font-pregular text-center text-lg mt-7 text-black/30">
                no recent acitvity
              </Text>
              <CustomButton
                title="Add Expense"
                handlePress={() => router.push("/expense")}
                containerStyles="mt-7 w-full"
              />
            </View>
          )}
        </View>
        <CustomButton
          title="Logout"
          handlePress={() => {}}
          containerStyles="bg-transparent"
          textStyles="text-red-500"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
