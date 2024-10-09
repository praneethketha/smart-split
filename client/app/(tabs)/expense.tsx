import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card from "@/components/card";
import { Link } from "expo-router";

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
          <View className="justify-between flex-row items-center">
            <Text className="text-2xl font-pbold">Expenses</Text>
            <Link href="/create">
              <MaterialIcons name="add" size={32} color="#000" />
            </Link>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            renderItem={({ item }) => <Card {...item} baseURL="/expense" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expenses;
