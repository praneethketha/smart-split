import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/custom-button";

const data = {
  _id: "66fd297525244f4aab704518",
  name: "Milk",
  price: 5,
  purchasedBy: {
    _id: "66fce27a8e99193566b4a309",
    name: "rupesh",
    email: "rupesh@gmail.com",
  },
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
};

const timeFormatter = new Intl.DateTimeFormat("en-us", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const ItemDetail = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6 space-y-6">
          <View className="flex-row justify-between items-center">
            <View className="gap-4 flex-row items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} />
              </TouchableOpacity>
              <Text className="text-2xl font-pbold">Item Details</Text>
            </View>
            <Link
              href={{
                pathname: "/expense/add-item",
                params: {
                  itemId: data._id,
                },
              }}
            >
              <MaterialIcons name="edit" size={24} />
            </Link>
          </View>

          {/* header  */}
          <View className="flex-row pb-6 border-b border-black/5">
            <View className="items-center justify-center w-16 h-16 p-2 rounded-full border border-black/5">
              <MaterialIcons
                name="local-grocery-store"
                size={32}
                color="#666"
              />
            </View>
            <View className="space-y-2 ml-4">
              <Text className="font-pregular text-lg">{data.name}</Text>
              <Text className="font-psemibold text-3xl">${data.price}</Text>
              <Text className="font-pregular text-black/50">
                Paid by {data.purchasedBy.name} on{" "}
                {timeFormatter.format(new Date(data.createdAt))}
              </Text>
            </View>
          </View>

          {/* Item info */}
          <View className="space-y-4">
            <Text className="text-lg font-psemibold text-black-200">
              Exempted By
            </Text>
            <FlatList
              data={data.exemptedBy}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View className="items-center py-2 flex-row gap-2">
                  {/* avatar  */}
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
                  <Text className="font-pregular text-lg">{item.name}</Text>
                </View>
              )}
            />
          </View>

          {/* shared users  */}
          <View className="space-y-4">
            <Text className="text-lg font-psemibold text-black-200">
              Shared By
            </Text>
            <FlatList
              data={data.sharedBy}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View className="items-center py-2 flex-row gap-2">
                  {/* avatar  */}
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
                  <Text className="font-pregular text-lg">{item.name}</Text>
                </View>
              )}
            />
          </View>

          <CustomButton
            title="Remove Item"
            handlePress={() => {}}
            containerStyles="mt-7 bg-transparent"
            textStyles="text-red-500"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetail;
