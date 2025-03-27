import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <SafeAreaView>
      <Link href={"/(tabs)/home"}>
        <Text>Go To Dashboard</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Page;
