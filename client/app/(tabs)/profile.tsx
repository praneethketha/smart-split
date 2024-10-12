import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Card, { CardLinkWrapper } from "@/components/card";
import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupsOptions } from "@/api/group";
import { updateUser, userOptions } from "@/api/user";
import AuthContext from "@/context/auth";

const Profile = () => {
  const { logout } = useContext(AuthContext);

  const { data: user } = useQuery(userOptions());
  const userInfo = user?.data;

  const { data: groups } = useQuery(groupsOptions());
  const groupsInfo = groups?.data;

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string | undefined>(userInfo?.name);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setIsModalVisible(false);
    },
  });

  const handleUpdate = () => {
    if (!name || name !== userInfo?.name) {
      console.log({ name });
      updateMutation.mutate(name);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {userInfo ? (
        <View className="w-full px-4 my-6 justify-between flex-1">
          <View className="w-full flex-1 space-y-6">
            <Text className="text-2xl font-pbold">Profile</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-2 items-center">
                <View className="w-12 h-12 bg-orange-500 rounded-full justify-center items-center">
                  <Text className="text-white font-pmedium text-lg">
                    {userInfo.name
                      .split(" ")
                      .reduce((acc, curr) => (acc += curr[0]), "")}
                  </Text>
                </View>
                <View>
                  <Text className="font-pmedium text-xl">{userInfo.name}</Text>
                  <Text className="font-pregular text-black-200">
                    {userInfo.email}
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
                  <ScrollView>
                    <View className="flex-1">
                      <View className="flex-row gap-4 items-center p-4">
                        <TouchableOpacity
                          onPress={() => setIsModalVisible(false)}
                        >
                          <MaterialIcons name="close" size={24} />
                        </TouchableOpacity>
                        <Text className="font-pmedium text-lg">
                          Edit Profile
                        </Text>
                      </View>
                      <View className="flex-1 px-4">
                        <FormField
                          title="Name"
                          value={name}
                          placeholder="Enter name"
                          onChangeText={setName}
                          otherStyles="mt-7"
                        />
                        <CustomButton
                          title="Save"
                          containerStyles="mt-7"
                          handlePress={handleUpdate}
                          isLoading={updateMutation.isPending}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
              </View>
            </View>
            {groupsInfo?.length ? (
              <View className="flex-1 space-y-4">
                <Text className="text-lg font-psemibold text-black-200">
                  Groups
                </Text>
                <FlatList
                  data={groupsInfo}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <CardLinkWrapper _id={item._id} baseURL="/group">
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
              <View className="space-y-6 items-center justify-center">
                <Text className="font-pregular text-center text-lg mt-7 text-black/30">
                  no recent acitvity
                </Text>
              </View>
            )}
          </View>
          <CustomButton
            title="Logout"
            handlePress={logout}
            containerStyles="bg-transparent"
            textStyles="text-red-500"
          />
        </View>
      ) : (
        <View className="h-full w-full px-4 my-6 space-y-6">
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
