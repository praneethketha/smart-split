import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import React from "react";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";

const response = [
  {
    _id: "66fce2f78e99193566b4a30c",
    name: "Roommates",
    members: [
      {
        _id: "66fce2031b0b342948054021",
        name: "praneeth",
        email: "praneeth@gmail.com",
        password: "Password",
        expensesPaid: [],
        expensesOwed: ["66fcf2673a9d0731f8d976b2"],
        createdAt: "2024-10-02T06:02:43.123Z",
        __v: 2,
        balance: 8.333333333333332,
      },
      {
        _id: "66fce27a8e99193566b4a309",
        name: "rupesh",
        email: "rupesh@gmail.com",
        password: "Password",
        expensesPaid: ["66fcf2673a9d0731f8d976b2"],
        expensesOwed: [],
        createdAt: "2024-10-02T06:04:42.771Z",
        __v: 2,
        balance: -5.833333333333333,
      },
      {
        _id: "66fce78ab5a4cbac4732c337",
        name: "harsha",
        email: "harsha@gmail.com",
        password: "Password",
        expensesPaid: [],
        expensesOwed: ["66fcf2673a9d0731f8d976b2"],
        createdAt: "2024-10-02T06:26:18.434Z",
        __v: 2,
        balance: 5.833333333333333,
      },
    ],
    createdAt: "2024-10-02T06:06:47.282Z",
    __v: 4,
    expenses: ["66fcf2673a9d0731f8d976b2"],
  },
];

const Groups = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{
    name: string;
  }>({
    name: "",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="h-full w-full px-4 my-6 space-y-6">
          <View
            className={`flex-row items-center ${
              response.length ? "justify-between" : "justify-start"
            }`}
          >
            <Text className="text-2xl font-pbold">Groups</Text>
            {response.length ? (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="add" size={32} color="#000" />
              </TouchableOpacity>
            ) : null}
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
                <Text className="font-pmedium text-lg">Add Group</Text>
              </View>
              <View className="w-full h-full px-4 my-4">
                <FormField
                  title="Name"
                  value={form?.name.toString()}
                  placeholder="Enter name"
                  onChangeText={(e) => setForm({ ...form, name: e })}
                  otherStyles="h-24"
                />
                <CustomButton
                  title="Save"
                  handlePress={() => {}}
                  containerStyles="mt-7"
                />
              </View>
            </Modal>
          </View>
          {response.length ? (
            <FlatList
              data={response}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <CardLinkWrapper _id={item._id} baseURL="/groups">
                  <Card {...item} index={index} isGet={true} amount={66.66} />
                </CardLinkWrapper>
              )}
            />
          ) : (
            <View className="space-y-6 h-full items-center justify-center">
              <Text className="font-pregular text-center text-lg mt-7 text-black/30">
                No Groups Available
              </Text>
              <CustomButton
                title="Create New"
                handlePress={() => setIsModalVisible(true)}
                containerStyles="mt-7 w-full"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;
