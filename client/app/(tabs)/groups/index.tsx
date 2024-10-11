import {
  View,
  Text,
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
import { useQuery } from "@tanstack/react-query";
import { groupsOptions } from "@/api/group";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Groups = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{
    name: string;
  }>({
    name: "",
  });

  const { data } = useQuery(groupsOptions("66fce2031b0b342948054021"));
  const groupsData = data?.data;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {groupsData ? (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <View
              className={`flex-row items-center ${
                groupsData?.length ? "justify-between" : "justify-start"
              }`}
            >
              <Text className="text-2xl font-pbold">Groups</Text>
              {groupsData?.length ? (
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
            {groupsData.length ? (
              <FlatList
                data={groupsData}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <CardLinkWrapper _id={item._id} baseURL="/groups">
                    <Card
                      {...item}
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
        ) : (
          <View className="h-full w-full px-4 my-6 space-y-6">
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;
