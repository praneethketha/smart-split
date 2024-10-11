import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Card from "@/components/card";
import CustomButton from "@/components/custom-button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    _id: "1",
    name: "Praneeth Kumar",
    amount: 283.33,
    isGet: true,
  },
  {
    _id: "2",
    name: "Rupesh Kumar",
    amount: 33.33,
    isGet: false,
  },
];

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6 space-y-6">
          <Text className="text-2xl font-pbold">Balances</Text>
          {data.length ? (
            <View className="space-y-6">
              <View className="flex-1 p-4 gap-2 bg-primary rounded-2xl">
                <Text className="text-lg font-pregular text-white/80">
                  You get
                </Text>
                <Text className="text-4xl font-pbold text-white">$ 316.66</Text>
              </View>
              <View className="flex-1 space-y-4">
                <Text className="text-lg font-psemibold text-black-200">
                  Recent Info
                </Text>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <Card {...item} index={index} />
                  )}
                />
              </View>
            </View>
          ) : (
            <View className="space-y-6 h-full items-center justify-center">
              <Text className="font-pregular text-center text-lg mt-7 text-black/30">
                No acitvity
              </Text>
              <CustomButton
                title="Add Expense"
                handlePress={() => router.push("/expense")}
                containerStyles="mt-7 w-full"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
