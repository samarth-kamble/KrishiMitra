import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  // return <Redirect href={"/(auth)/welcome"} />;
  return (
    <SafeAreaView>
      <Link href="/home">Go to dashboard</Link>
    </SafeAreaView>
  )
};

export default Page;
