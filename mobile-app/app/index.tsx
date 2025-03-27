import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return <Redirect href={"/(auth)/welcome"} />;
};

export default Page;
