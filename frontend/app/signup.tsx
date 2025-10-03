import { UserCreationData } from "@/types/user/";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signUp } from "../service/authentification";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setSignupError(null);
    const userData: UserCreationData = {
      username,
      email,
      password,
      firstName: firstname,
      lastName: lastname,
    };

    console.log("User data to sign up:", userData);

    try {
      const result = await signUp(userData);
      console.log("Signup result:", result);
    } catch (error: any) {
      console.error(error);
      setSignupError(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>

      <Text style={styles.text}>Nom d'utilisateur :</Text>
      <TextInput style={styles.input} placeholderTextColor="#999" value={username} onChangeText={setUsername} />

      <Text style={styles.text}>Adresse e-mail :</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.text}>Mot de passe :</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.text}>Prénom :</Text>
      <TextInput style={styles.input} placeholderTextColor="#999" value={firstname} onChangeText={setFirstname} />

      <Text style={styles.text}>Nom :</Text>
      <TextInput style={styles.input} placeholderTextColor="#999" value={lastname} onChangeText={setLastname} />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
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
