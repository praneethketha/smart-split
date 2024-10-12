import { View, Text, ScrollView, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import { Link, router } from "expo-router";
import CustomButton from "@/components/custom-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { expensesOptions } from "@/api/expense";

const Expenses = () => {
  const { data } = useQuery(expensesOptions());
  const expenseInfo = data?.data;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {expenseInfo ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View
              className={`flex-row items-center ${
                expenseInfo.length ? "justify-between" : "justify-start"
              }`}
            >
              <Text className="text-2xl font-pbold">Expenses</Text>
              {expenseInfo.length ? (
                <Link href="/create">
                  <MaterialIcons name="add" size={32} color="#000" />
                </Link>
              ) : null}
            </View>
            {expenseInfo.length ? (
              <FlatList
                data={expenseInfo}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <CardLinkWrapper _id={item._id} baseURL="/expense">
                    <Card
                      _id={item._id}
                      name={item.description}
                      index={index}
                      amount={
                        item.totalOwed ? item.totalOwed : item.totalReturned
                      }
                      isGet={item.totalReturned > 0}
                    />
                  </CardLinkWrapper>
                )}
              />
            ) : (
              <View className="space-y-6 h-full items-center justify-center">
                <Text className="font-pregular text-center text-lg mt-7 text-black/30">
                  no expense recorded
                </Text>
                <CustomButton
                  title="Add Expense"
                  handlePress={() => router.push("/create")}
                  containerStyles="mt-7 w-full"
                />
              </View>
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

export default Expenses;
