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
import Card from "@/components/card";
import React from "react";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";

const data = [
  {
    _id: "1",
    name: "Roommates",
    amount: 66.66,
    isGet: true,
  },
  {
    _id: "2",
    name: "Bengaluru",
    amount: 33.33,
    isGet: false,
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
          <View className="justify-between flex-row items-center">
            <Text className="text-2xl font-pbold">Groups</Text>
            <View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="add" size={32} color="#000" />
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
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            renderItem={({ item }) => <Card {...item} baseURL="/groups" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;
