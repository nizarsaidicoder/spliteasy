import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Label, Paragraph, SizableText } from "tamagui";
import { Input } from "tamagui";
import { Text, XStack, YStack } from "tamagui";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login avec :", username, password);
  };

  return (
    <YStack justifyContent="center" gap={24} padding={30} height={"100%"}>
      <Text fontWeight={"bold"} fontSize={50}>
        Hey !
      </Text>
      <YStack gap={4}>
        <Label>Nom d'utilisateur ou adresse e-mail :</Label>
        <Input borderWidth={0} onChangeText={setUsername} />
      </YStack>

      <YStack gap={4}>
        <Label>Mot de passe :</Label>
        <Input borderWidth={0} secureTextEntry={true} onChangeText={setPassword} />
      </YStack>
      <Button borderColor="#FEBB1B" borderWidth={2} onPress={handleLogin}>
        Se connecter
      </Button>
    </YStack>
  );
}
