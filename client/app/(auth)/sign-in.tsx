import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const submit = () => {};
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Text className="text-3xl font-pblack text-primary mb-4">
            Smart Split
          </Text>
          <Text className="text-2xl font-psemibold mt-10">Sign In</Text>
          <FormField
            title="Email"
            value={form?.email}
            onChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form?.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="text-sm gap-1 mt-4 flex-row justify-center">
            <Text className="text-black-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="/sign-up" className="font-psemibold text-primary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
