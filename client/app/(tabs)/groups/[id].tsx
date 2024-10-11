import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/custom-button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, groupOptions } from "@/api/group";
import ExpenseCard from "@/components/expense-card";

// TODO: add expenses to the response & total amount owes or owed
const GroupDetail = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const { id } = useLocalSearchParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { data } = useQuery(groupOptions(id, "66fce78ab5a4cbac4732c337"));
  const groupInfo = data?.data;

  const totalAmount = groupInfo?.expenses?.reduce(
    (total, expense) =>
      (total += expense.totalOwed ? -expense.totalOwed : expense.totalReturned),
    0
  );

  const deleteMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsModalVisible(false);
      router.back();
    },
  });

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
                <Text className="text-2xl font-pbold">{groupInfo.name}</Text>
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
                  {groupInfo.members.length ? (
                    <View className="space-y-4">
                      <Text className="text-lg font-psemibold text-black-200">
                        Members
                      </Text>
                      <FlatList
                        data={groupInfo.members}
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
                  ) : (
                    <Text className="text-lg text-black/50 font-pregular">
                      No members
                    </Text>
                  )}
                  <View className="space-y-2 mt-7">
                    <Text className="text-lg font-psemibold text-black-200">
                      Actions
                    </Text>
                    <CustomButton
                      title="Delete Group"
                      handlePress={() => {
                        deleteMutation.mutate(groupInfo._id);
                      }}
                      containerStyles="bg-transparent justify-start"
                      textStyles="text-red-500"
                    />
                  </View>
                </View>
              </Modal>
            </View>
            {totalAmount ? (
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-xl font-pregular ${
                    totalAmount > 0 ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  you {totalAmount > 0 ? "get" : "owe"}
                </Text>
                <Text
                  className={`font-pmedium text-xl ${
                    totalAmount > 0 ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  ${(totalAmount > 0 ? totalAmount : -totalAmount).toFixed(2)}
                </Text>
              </View>
            ) : null}
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
            {groupInfo.expenses.length ? (
              <View className="flex-1 space-y-4">
                <Text className="text-lg font-psemibold text-black-200">
                  Expenses
                </Text>
                <FlatList
                  data={groupInfo.expenses}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <ExpenseCard
                      _id={item._id}
                      baseURL="/expense"
                      name={item.description}
                      paidBy={item.paidBy.name}
                      index={index}
                      amount={
                        item.totalOwed ? item.totalOwed : item.totalReturned
                      }
                      isGet={item.totalReturned > 0}
                    />
                  )}
                />
              </View>
            ) : (
              <Text className="font-pregular text-lg text-black/50">
                No expenses available
              </Text>
            )}
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
