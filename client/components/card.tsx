import { Link } from "expo-router";
import { View, Text } from "react-native";
const colors = [
  "bg-blue-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-purple-500",
  "bg-lime-500",
];

const Card = ({
  _id,
  name,
  isGet,
  amount,
  baseURL,
}: {
  _id: string;
  name: string;
  isGet: boolean;
  amount: number;
  baseURL: string;
}) => {
  return (
    <Link href={`${baseURL}/${_id}`} className="flex-1 w-full">
      <View className="w-full items-center flex-row justify-between py-2">
        <View className="items-center justify-center flex-row gap-2">
          <View
            className={`items-center justify-center w-10 h-10 rounded-full ${
              colors[Number(_id) - 1]
            }`}
          >
            <Text className="font-pregular text-lg text-white uppercase">
              {name.split(" ").reduce((acc, curr) => (acc += curr[0]), "")}
            </Text>
          </View>
          <Text className="font-pregular text-lg">{name}</Text>
        </View>
        <View className="items-end">
          <Text
            className={`text-sm ${
              isGet ? "text-green-500" : "text-orange-500"
            }`}
          >
            you {isGet ? "get" : "owe"}
          </Text>
          <Text
            className={`font-pmedium text-lg ${
              isGet ? "text-green-500" : "text-orange-500"
            }`}
          >
            ${amount}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default Card;
