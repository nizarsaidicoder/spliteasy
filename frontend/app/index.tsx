import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ColocGo !</Text>
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
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
    fontSize: 80,
    fontFamily: "Arial",
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    marginVertical: 10,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
    elevation: 2,
    width: "80%",
  },
  buttonText: {
    color: "#FEBB1B",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
});

