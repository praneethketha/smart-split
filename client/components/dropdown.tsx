import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Dropdown = ({
  title,
  placeholder,
  selected,
  options,
  handlePress,
  containerStyles,
}: {
  title: string;
  placeholder: string;
  selected: string;
  options: {
    label: string;
    value: string;
  }[];
  handlePress: (value: string) => void;
  containerStyles?: string;
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const handleSelect = (value: string) => {
    handlePress(value);
    setIsModalVisible(false);
  };

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <View className={`space-y-1 ${containerStyles}`}>
      <Text className="text-base text-black-100 font-pmedium">{title}</Text>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-primary flex-1 flex-row justify-between items-center">
          <Text
            className={`font-pregular text-base ${
              selectedOption ? "text-black" : "text-[#aaa]"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Ionicons name="chevron-down" size={24} color="#aaa" />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <View className="p-4 flex-row gap-4 items-center mb-7">
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <MaterialIcons name="close" size={24} />
            </TouchableOpacity>
            <Text className="font-pmedium">Please select</Text>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item.value)}>
                <View className="flex-row justify-between items-center p-4 border-b border-black/5">
                  <Text
                    className={`text-base ${
                      selected === item.value ? "font-pmedium" : "font-pregular"
                    }`}
                  >
                    {item.label}
                  </Text>
                  {selected === item.value ? (
                    <MaterialIcons name="check" size={24} />
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
