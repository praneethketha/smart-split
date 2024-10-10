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
import { Link, router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/custom-button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const data = {
  expense: {
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
        user: {
          _id: "66fce27a8e99193566b4a309",
          name: "rupesh",
          email: "rupesh@gmail.com",
        },
        shareAmount: 5.833333333333333,
        exemptedItems: ["Yogurt"],
        _id: "66fd333dbed4382ea873456d",
      },
      {
        user: {
          _id: "66fce2031b0b342948054021",
          name: "praneeth",
          email: "praneeth@gmail.com",
        },
        shareAmount: 8.333333333333332,
        exemptedItems: [],
        _id: "66fd333dbed4382ea873456e",
      },
      {
        user: {
          _id: "66fce78ab5a4cbac4732c337",
          name: "harsha",
          email: "harsha@gmail.com",
        },
        shareAmount: 5.833333333333333,
        exemptedItems: ["Milk"],
        _id: "66fd333dbed4382ea873456f",
      },
    ],
    createdAt: "2024-10-02T07:12:39.608Z",
    __v: 3,
  },
  items: [
    {
      _id: "66fd297525244f4aab704518",
      name: "Milk",
      price: 5,
      purchasedBy: "66fce27a8e99193566b4a309",
      sharedBy: [
        {
          _id: "66fce27a8e99193566b4a309",
          name: "rupesh",
          email: "rupesh@gmail.com",
        },
        {
          _id: "66fce2031b0b342948054021",
          name: "praneeth",
          email: "praneeth@gmail.com",
        },
      ],
      exemptedBy: [
        {
          _id: "66fce78ab5a4cbac4732c337",
          name: "harsha",
          email: "harsha@gmail.com",
        },
      ],
      expense: "66fcf2673a9d0731f8d976b2",
      createdAt: "2024-10-02T11:07:33.479Z",
      __v: 0,
    },
    {
      _id: "66fd2a20621a599aad22388f",
      name: "Bread",
      price: 4,
      purchasedBy: "66fce27a8e99193566b4a309",
      sharedBy: [
        {
          _id: "66fce27a8e99193566b4a309",
          name: "rupesh",
          email: "rupesh@gmail.com",
        },
        {
          _id: "66fce2031b0b342948054021",
          name: "praneeth",
          email: "praneeth@gmail.com",
        },
        {
          _id: "66fce78ab5a4cbac4732c337",
          name: "harsha",
          email: "harsha@gmail.com",
        },
      ],
      exemptedBy: [],
      expense: "66fcf2673a9d0731f8d976b2",
      createdAt: "2024-10-02T11:10:24.907Z",
      __v: 0,
    },
    {
      _id: "66fd2a36621a599aad223891",
      name: "Eggs",
      price: 6,
      purchasedBy: "66fce27a8e99193566b4a309",
      sharedBy: [
        {
          _id: "66fce27a8e99193566b4a309",
          name: "rupesh",
          email: "rupesh@gmail.com",
        },
        {
          _id: "66fce2031b0b342948054021",
          name: "praneeth",
          email: "praneeth@gmail.com",
        },
        {
          _id: "66fce78ab5a4cbac4732c337",
          name: "harsha",
          email: "harsha@gmail.com",
        },
      ],
      exemptedBy: [],
      expense: "66fcf2673a9d0731f8d976b2",
      createdAt: "2024-10-02T11:10:46.594Z",
      __v: 0,
    },
    {
      _id: "66fd2a74621a599aad223893",
      name: "Yogurt",
      price: 5,
      purchasedBy: "66fce27a8e99193566b4a309",
      sharedBy: [
        {
          _id: "66fce2031b0b342948054021",
          name: "praneeth",
          email: "praneeth@gmail.com",
        },
        {
          _id: "66fce78ab5a4cbac4732c337",
          name: "harsha",
          email: "harsha@gmail.com",
        },
      ],
      exemptedBy: [
        {
          _id: "66fce27a8e99193566b4a309",
          name: "rupesh",
          email: "rupesh@gmail.com",
        },
      ],
      expense: "66fcf2673a9d0731f8d976b2",
      createdAt: "2024-10-02T11:11:48.339Z",
      __v: 0,
    },
  ],
};

const timeFormatter = new Intl.DateTimeFormat("en-us", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const ExpenseDetail = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {data ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View className="flex-row justify-between items-center">
              <View className="gap-4 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text className="text-2xl font-pbold">Expense Details</Text>
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
                  <Text className="font-pmedium text-lg">Expense Info</Text>
                </View>
                <View className="w-full h-full px-4 my-4">
                  <View className="space-y-4">
                    <Text className="text-lg font-psemibold text-black-200">
                      Participants
                    </Text>
                    <FlatList
                      data={data.expense.sharedWith}
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
                  </View>
                  <View className="space-y-2 mt-7">
                    <Text className="text-lg font-psemibold text-black-200">
                      Actions
                    </Text>
                    <CustomButton
                      title="Delete Expense"
                      handlePress={() => {}}
                      containerStyles="bg-transparent justify-start"
                      textStyles="text-red-500"
                    />
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
                  {data.expense.description}
                </Text>
                <Text className="font-psemibold text-3xl">
                  ${data.expense.totalAmount}
                </Text>
                <Text className="font-pregular text-black/50">
                  Paid by {data.expense.paidBy.name} on{" "}
                  {timeFormatter.format(new Date(data.expense.date))}
                </Text>
              </View>
            </View>
            <View className="flex-4 space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-psemibold text-black-200">
                  Items
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/expense/add-item?expenseId=${data.expense._id}`
                    )
                  }
                >
                  <MaterialIcons name="add" size={24} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={data.items}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <Link
                    href={`expense/item/${item._id}`}
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
