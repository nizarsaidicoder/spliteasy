import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "tamagui";
import { Input } from "tamagui";
import { XStack, YStack } from "tamagui";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login avec :", username, password);
  };

  return (
    <YStack width="90%" minHeight={250} overflow="hidden" gap="$2" margin="$3" padding="$2">
      <Text style={styles.title}>Hey !</Text>

      <Text style={styles.text}>Nom d'utilisateur ou adresse e-mail :</Text>
      <TextInput style={styles.input} placeholderTextColor="#999" value={username} onChangeText={setUsername} />

      <Text style={styles.text}>Mot de passe :</Text>
      <Input size="$4" borderWidth={2} />

      <Button>Lorem ipsum</Button>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: "black",
    width: "80%",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    width: "80%",
  },
  input: {
    backgroundColor: "#f1f1f1ff",
    width: "80%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#FEBB1B",
    borderWidth: 3,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    marginVertical: 40,
    width: "80%",
  },
  buttonText: {
    color: "#FEBB1B",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
});
