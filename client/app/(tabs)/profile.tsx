import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card from "@/components/card";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";

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
const Profile = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{
    name: string;
  }>({
    name: "",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="w-full px-4 my-6 justify-between flex-1">
        <View className="w-full flex-1 space-y-6">
          <Text className="text-2xl font-pbold">Profile</Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <View className="w-12 h-12 bg-orange-500 rounded-full justify-center items-center">
                <Text className="text-white font-pmedium text-lg">PK</Text>
              </View>
              <View>
                <Text className="font-pmedium text-xl">Praneeth Kumar</Text>
                <Text className="font-pregular text-black-200">
                  praneet4545@gmail.com
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <MaterialIcons name="edit" size={24} />
              </TouchableOpacity>
              <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet"
              >
                <View className="flex-1">
                  <View className="flex-row gap-4 items-center p-4">
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                      <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                    <Text className="font-pmedium text-lg">Edit Profile</Text>
                  </View>
                  <View className="flex-1 px-4">
                    <FormField
                      title="Name"
                      value={form?.name}
                      placeholder="Enter name"
                      onChangeText={(e) => setForm({ ...form, name: e })}
                      otherStyles="mt-7 h-24"
                    />
                    <CustomButton
                      title="Save"
                      containerStyles="mt-7"
                      handlePress={() => {}}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View className="flex-1 space-y-2">
            <Text className="text-lg font-psemibold text-black-200">
              Groups
            </Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
              renderItem={({ item }) => <Card {...item} baseURL="/group" />}
            />
          </View>
        </View>
        <CustomButton
          title="Logout"
          handlePress={() => {}}
          containerStyles="bg-transparent border border-red-500"
          textStyles="text-red-500"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
