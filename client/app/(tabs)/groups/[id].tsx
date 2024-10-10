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

const GroupDetail = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const { id } = useLocalSearchParams();
  const groupInfo = data.find((group) => group._id === id);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {groupInfo ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View className="flex-row justify-between items-center">
              <View className="gap-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text className="text-2xl font-pbold">{groupInfo?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="info" size={24} />
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
                  <View className="space-y-2">
                    <Text className="text-lg font-psemibold text-black-200">
                      Members
                    </Text>
                    <FlatList
                      data={members}
                      keyExtractor={(item) => item._id}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <View className="items-center flex-row gap-2 w-full py-2">
                          <View
                            className="items-center justify-center w-10 h-10 rounded-full"
                            style={{
                              backgroundColor: `hsl(${
                                ((Number(item._id) - 1) * 137.5) % 360
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
                  groupInfo?.isGet ? "text-green-500" : "text-orange-500"
                }`}
              >
                you {groupInfo?.isGet ? "get" : "owe"}
              </Text>
              <Text
                className={`font-pmedium text-lg ${
                  groupInfo?.isGet ? "text-green-500" : "text-orange-500"
                }`}
              >
                ${groupInfo?.amount}
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <CustomButton
                title="Add Expense"
                handlePress={() =>
                  router.push(`/create?groupId=${groupInfo._id}`)
                }
                containerStyles="flex-1 min-h-[50px] mr-4"
              />
              <CustomButton
                title="Add Members"
                handlePress={() =>
                  router.push(`/groups/add-member?groupId=${groupInfo._id}`)
                }
                containerStyles="bg-black/10 flex-1 min-h-[50px]"
                textStyles="text-black"
              />
            </View>
            <View className="flex-1 space-y-2">
              <Text className="text-lg font-psemibold text-black-200">
                Expenses
              </Text>
              <FlatList
                data={expenses}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <CardLinkWrapper _id={item._id} baseURL="/expense">
                    <Card {...item} />
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
