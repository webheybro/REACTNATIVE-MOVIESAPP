import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Constants } from "expo";
import Films from "./pages/Films";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME PAGE</Text>
      <Button
        title="Films list"
        onPress={() => navigation.navigate("Films", { params: "exemple" })}
        style={{ marginTop: 50 }}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Films", { params: "exemple" })}>
        FILMS
      </Text>
      <Button
        title="Retour"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 50 }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "HOME" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Page intérmédiaire" }}
        />
        <Stack.Screen
          name="Films"
          component={Films}
          options={{ title: "Films" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: Constants.statusBarWeight,
  },
  title: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "20px",
  },
});
