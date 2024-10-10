import { Link } from "expo-router";
import { View, Text } from "react-native";
const colors = [
  "bg-blue-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-purple-500",
  "bg-lime-500",
];

export const CardLinkWrapper = ({
  _id,
  baseURL,
  children,
}: {
  _id: string;
  baseURL: string;
  children: React.ReactNode;
}) => (
  <Link href={`${baseURL}/${_id}`} className="flex-1 w-full">
    {children}
  </Link>
);

const Card = ({
  _id,
  index,
  name,
  isGet,
  amount,
}: {
  _id: string;
  index: number;
  name: string;
  isGet: boolean;
  amount: number;
}) => {
  return (
    <View className="w-full items-center flex-row justify-between py-2">
      <View className="items-center justify-center flex-row gap-2">
        <View
          className="items-center justify-center w-10 h-10 rounded-full"
          style={{
            backgroundColor: `hsl(${
              ((Number(index) - 1) * 137.5) % 360
            }, 50%, 50%)`,
          }}
        >
          <Text className="font-pregular text-lg text-white uppercase">
            {name.split(" ").reduce((acc, curr) => (acc += curr[0]), "")}
          </Text>
        </View>
        <Text className="font-pregular text-lg">{name}</Text>
      </View>
      <View className="items-end">
        <Text
          className={`text-sm ${isGet ? "text-green-500" : "text-orange-500"}`}
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
  );
};

export default Card;
