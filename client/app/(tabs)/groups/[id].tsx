import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/custom-button";
import Card, { CardLinkWrapper } from "@/components/card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dropdown from "@/components/dropdown";

const response = {
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
};

const expenses = [
  {
    _id: "1",
    name: "Market",
    paidBy: "You",
    paidAmount: 100.0,
    amount: 66.66,
    isGet: true,
  },
];

// TODO: add expenses to the response & total amount owes or owed
const GroupDetail = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const { id } = useLocalSearchParams();
  // const groupInfo = data.find((group) => group._id === id);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {response ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View className="flex-row justify-between items-center">
              <View className="gap-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text className="text-2xl font-pbold">{response?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="info-outline" size={24} />
              </TouchableOpacity>
              <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet"
              >
                <View className="p-4 flex-row gap-4 items-center">
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <MaterialIcons name="close" size={24} />
                  </TouchableOpacity>
                  <Text className="font-pmedium text-lg">Group Info</Text>
                </View>
                <View className="w-full h-full px-4 my-4">
                  <View className="space-y-4">
                    <Text className="text-lg font-psemibold text-black-200">
                      Members
                    </Text>
                    <FlatList
                      data={response.members}
                      keyExtractor={(item) => item._id}
                      scrollEnabled={false}
                      renderItem={({ item, index }) => (
                        <View className="items-center flex-row gap-2 w-full py-2">
                          <View
                            className="items-center justify-center w-10 h-10 rounded-full"
                            style={{
                              backgroundColor: `hsl(${
                                ((Number(index) - 1) * 137.5) % 360
                              }, 50%, 50%)`,
                            }}
                          >
                            <Text className="font-pregular text-lg text-white uppercase">
                              {item.name
                                .split(" ")
                                .reduce((acc, curr) => (acc += curr[0]), "")}
                            </Text>
                          </View>
                          <Text className="font-pregular text-lg">
                            {item.name}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                  <View className="space-y-2 mt-7">
                    <Text className="text-lg font-psemibold text-black-200">
                      Actions
                    </Text>
                    <CustomButton
                      title="Delete Group"
                      handlePress={() => {}}
                      containerStyles="bg-transparent justify-start"
                      textStyles="text-red-500"
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View className="flex-row items-center gap-2">
              <Text
                className={`text-lg font-pregular ${
                  true ? "text-green-500" : "text-orange-500"
                }`}
              >
                you {true ? "get" : "owe"}
              </Text>
              <Text
                className={`font-pmedium text-lg ${
                  true ? "text-green-500" : "text-orange-500"
                }`}
              >
                ${66.66}
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <CustomButton
                title="Add Expense"
                handlePress={() =>
                  router.push(`/create?groupId=${response._id}`)
                }
                containerStyles="flex-1 min-h-[50px] mr-4"
              />
              <CustomButton
                title="Add Members"
                handlePress={() =>
                  router.push(`/groups/add-member?groupId=${response._id}`)
                }
                containerStyles="bg-black/10 flex-1 min-h-[50px]"
                textStyles="text-black"
              />
            </View>
            <View className="flex-1 space-y-4">
              <Text className="text-lg font-psemibold text-black-200">
                Expenses
              </Text>
              <FlatList
                data={expenses}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <CardLinkWrapper _id={item._id} baseURL="/expense">
                    <Card {...item} index={index} />
                  </CardLinkWrapper>
                )}
              />
            </View>
          </View>
        ) : (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <Text className="font-pregular text-base text-black/50">
              Loading...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetail;
