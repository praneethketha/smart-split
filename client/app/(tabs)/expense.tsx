import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import { Link, router } from "expo-router";
import CustomButton from "@/components/custom-button";

const data = [
  {
    _id: "1",
    name: "Market",
    amount: 66.66,
    isGet: true,
  },
  {
    _id: "2",
    name: "Super Market",
    amount: 33.33,
    isGet: false,
  },
];

const Expenses = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6 space-y-6">
          <View
            className={`flex-row items-center ${
              data.length ? "justify-between" : "justify-start"
            }`}
          >
            <Text className="text-2xl font-pbold">Expenses</Text>
            {data.length ? (
              <Link href="/create">
                <MaterialIcons name="add" size={32} color="#000" />
              </Link>
            ) : null}
          </View>
          {data.length ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CardLinkWrapper _id={item._id} baseURL="/expense">
                  <Card {...item} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expenses;
