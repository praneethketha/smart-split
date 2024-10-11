import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/form-field";
import Dropdown from "@/components/dropdown";
import CustomButton from "@/components/custom-button";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const users = [
  { _id: "1", label: "Praneeth Kumar", value: "Praneeth Kumar" },
  { _id: "2", label: "Rupesh Keesaram", value: "Rupesh Keesaram" },
];

const groups = [
  { _id: "1", label: "Roommates", value: "1" },
  { _id: "2", label: "Bengaluru", value: "2" },
];

const Create = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const [form, setForm] = useState<{
    description: string;
    totalAmount: number;
    group: string;
    paidBy: string;
    image: string | null; // Add image to the form state
  }>({
    description: "",
    totalAmount: 0,
    group: groupId ?? "",
    paidBy: "",
    image: null, // Initially set to null
  });

  // Function to handle image picking
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri }); // Set the selected image URI in form state
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="flex-1 h-full w-full px-4 my-6">
          <Text className="text-2xl font-pbold">Add Expense</Text>

          <FormField
            title="Description"
            value={form?.description}
            placeholder="Enter Description"
            onChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Amount"
            value={form?.totalAmount.toString()}
            placeholder="Enter amount"
            onChangeText={(e) => setForm({ ...form, totalAmount: Number(e) })}
            keyboardType="number-pad"
            otherStyles="mt-7"
          />
          <Dropdown
            title="Paid By"
            placeholder="Select Member"
            options={users}
            selected={form.paidBy}
            handlePress={(value) => {
              setForm({ ...form, paidBy: value });
            }}
            containerStyles="mt-7"
          />
          <Dropdown
            title="Group"
            placeholder="Select Group"
            options={groups}
            selected={form.group}
            handlePress={(value) => {
              setForm({ ...form, group: value });
            }}
            containerStyles="mt-7"
            createNewLink="/groups"
          />

          {/* Add button to upload an image */}
          <Button title="Pick an image for the expense" onPress={pickImage} />

          {/* Show selected image preview */}
          {form.image && (
            <View className="my-5 items-center">
              <Text>Selected Image:</Text>
              <Image
                source={{ uri: form.image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          )}

          <CustomButton
            title="Save"
            handlePress={() => {
              // Handle saving the form along with the image
              // Example: send the image and form data to your API
              console.log("Form submitted: ", form);
            }}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
