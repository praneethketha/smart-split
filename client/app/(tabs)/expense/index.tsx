import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import { Link, router } from "expo-router";
import CustomButton from "@/components/custom-button";

const response = [
  {
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
];

const Expenses = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6 space-y-6">
          <View
            className={`flex-row items-center ${
              response.length ? "justify-between" : "justify-start"
            }`}
          >
            <Text className="text-2xl font-pbold">Expenses</Text>
            {response.length ? (
              <Link href="/create">
                <MaterialIcons name="add" size={32} color="#000" />
              </Link>
            ) : null}
          </View>
          {response.length ? (
            <FlatList
              data={response}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <CardLinkWrapper _id={item._id} baseURL="/expense">
                  <Card
                    _id={item._id}
                    name={item.description}
                    amount={item.totalAmount}
                    index={index}
                    isGet={true}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expenses;
