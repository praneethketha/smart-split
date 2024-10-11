import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/custom-button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, expenseOptions } from "@/api/expense";

const timeFormatter = new Intl.DateTimeFormat("en-us", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const ExpenseDetail = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const { id } = useLocalSearchParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { data } = useQuery(expenseOptions(id, "66fce78ab5a4cbac4732c337"));
  const expense = data?.data;

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setIsModalVisible(false);
      router.back();
    },
  });
  console.log({ image: expense?.image });
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {expense ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View className="flex-row justify-between items-center">
              <View className="gap-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text className="text-2xl font-pbold">Expense Details</Text>
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
                  <Text className="font-pmedium text-lg">Expense Info</Text>
                </View>
                <View className="w-full h-full px-4 my-4">
                  <View className="space-y-4">
                    <Text className="text-lg font-psemibold text-black-200">
                      Participants
                    </Text>
                    {expense.sharedWith.length ? (
                      <FlatList
                        data={expense.sharedWith}
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
                                {item.user.name
                                  .split(" ")
                                  .reduce((acc, curr) => (acc += curr[0]), "")}
                              </Text>
                            </View>
                            <View>
                              <Text className="font-pregular text-lg">
                                {item.user.name}
                              </Text>
                              <Text className="font-pregular text-black/50">
                                Shared Amount : ${item.shareAmount.toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        )}
                      />
                    ) : (
                      <Text className="font-pregular text-center text-base text-black/50 pt-7">
                        No participants
                      </Text>
                    )}
                  </View>
                  <View className="space-y-2 mt-7">
                    <Text className="text-lg font-psemibold text-black-200">
                      Actions
                    </Text>
                    <View className="px-4 mt-7 flex-row items-center justify-between gap-4">
                      <CustomButton
                        title="Edit Expense"
                        handlePress={() => {
                          setIsModalVisible(false);
                          router.push({
                            pathname: "/create",
                            params: {
                              groupId: expense.group,
                              expenseId: expense._id,
                            },
                          });
                        }}
                        containerStyles="bg-transparent flex-1"
                        textStyles="text-blue-500"
                      />
                      <CustomButton
                        title="Delete Expense"
                        handlePress={() => {
                          deleteMutation.mutate(id);
                        }}
                        containerStyles="bg-transparent flex-1 ml-4"
                        textStyles="text-red-500"
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View className="flex-row pb-6 border-b border-black/5">
              <View className="items-center justify-center w-16 h-16 p-2 rounded-full border border-black/5">
                <MaterialIcons name="money" size={32} color="#666" />
              </View>
              <View className="space-y-2 ml-4">
                <Text className="font-pregular text-lg">
                  {expense.description}
                </Text>
                <Text className="font-psemibold text-3xl">
                  ${expense.totalAmount}
                </Text>
                <Text className="font-pregular text-black/50">
                  Paid by {expense.paidBy.name} on{" "}
                  {timeFormatter.format(new Date(expense.date))}
                </Text>
              </View>
            </View>
            <View className="space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-psemibold text-black-200">
                  Items
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/expense/add-item",
                      params: {
                        expenseId: expense._id,
                        purchasedBy: expense.paidBy._id,
                      },
                    })
                  }
                >
                  <MaterialIcons name="add" size={24} />
                </TouchableOpacity>
              </View>
              {expense.items.length ? (
                <FlatList
                  data={expense.items}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <Link
                      href={{
                        pathname: "/expense/item",
                        params: {
                          itemId: item._id,
                        },
                      }}
                      className="flex-1 w-full"
                    >
                      <View className="w-full items-center flex-row justify-between py-2">
                        <View className="items-center justify-center flex-row gap-2">
                          <View
                            className="items-center justify-center w-12 h-12 rounded-full"
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
                          <View>
                            <Text className="font-pregular text-lg">
                              {item.name}
                            </Text>
                            {item.exemptedBy.length ? (
                              <View className="flex-row items-center gap-2">
                                <Text className="font-pregular">
                                  Exempted By :
                                </Text>
                                <Text className="font-pregular text-black/50">
                                  {item.exemptedBy
                                    .map((item) => item.name)
                                    .join(", ")}
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        </View>
                        <Text className="font-pmedium text-lg text-green-500">
                          ${item.price}
                        </Text>
                      </View>
                    </Link>
                  )}
                />
              ) : (
                <Text className="font-pregular text-center text-base text-black/50 pt-7">
                  No Items
                </Text>
              )}
            </View>
            <View className="space-y-4">
              <Text className="text-lg font-psemibold text-black-200">
                Image
              </Text>
              {expense.image ? (
                <View className="items-center w-full aspect-square">
                  <Image
                    source={{
                      uri: `http://192.168.29.11:8000${expense.image}`,
                    }}
                    className="w-full h-full"
                  />
                </View>
              ) : (
                <Text className="font-pregular text-center text-base text-black/50 pt-7">
                  No image attached to the expense
                </Text>
              )}
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

export default ExpenseDetail;
