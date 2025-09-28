import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 - Not Found</Text>
      <Link href="/" style={styles.button}>
        <Text style={styles.buttonText}>Retour au menu</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEBB1B",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: "#FEBB1B",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FEBB1B",
    fontSize: 16,
    textAlign: "center",
  },
});
