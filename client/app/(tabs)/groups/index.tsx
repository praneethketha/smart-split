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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGroup, groupsOptions } from "@/api/group";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Groups = () => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { data } = useQuery(groupsOptions());
  const groupsData = data?.data;

  const { mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsModalVisible(false);
      setName("");
      router.push({
        pathname: "/groups/[id]",
        params: {
          id: data.data._id,
        },
      });
    },
  });

  const validate = (value: string) => {
    let valid = true;
    if (!value) {
      setError("Group name is required");
      valid = false;
    } else {
      setError("");
    }

    return valid;
  };

  const handleChange = (e: string) => {
    setName(e);
    validate(e);
  };

  const handleSaveGroup = () => {
    if (!validate(name)) return;
    mutate(name);
  };

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
                <ScrollView>
                  <View className="p-4 flex-row gap-4 items-center">
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                      <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                    <Text className="font-pmedium text-lg">Add Group</Text>
                  </View>
                  <View className="w-full h-full flex-1 px-4 my-4">
                    <FormField
                      title="Name"
                      value={name.toString()}
                      placeholder="Enter name"
                      onChangeText={handleChange}
                      otherStyles="mt-0"
                      error={error}
                    />
                    <CustomButton
                      title="Save"
                      handlePress={handleSaveGroup}
                      containerStyles="mt-7"
                      isLoading={isPending}
                    />
                  </View>
                </ScrollView>
              </Modal>
            </View>
            {groupsData.length ? (
              <View className="flex-1 space-y-2">
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
              </View>
            ) : (
              <View className="space-y-6 flex-1 h-full items-center justify-center">
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
