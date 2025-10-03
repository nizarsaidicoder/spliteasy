import { UserLoginEmail, UserLoginUsername } from "@/types/user/";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Label, Text, YStack } from "tamagui";
import { signIn } from "../service/authentification";

type UserLogin = {
  identifier: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<UserLogin>({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: UserLogin) => {
    setLoading(true);
    setLoginError(null);

    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier);

      if (isEmail) {
        const emailLogin: UserLoginEmail = {
          email: data.identifier,
          password: data.password,
        };
        const result = await signIn(emailLogin);
        console.log("Email login result:", result);
      } else {
        const usernameLogin: UserLoginUsername = {
          username: data.identifier,
          password: data.password,
        };
        const result = await signIn(usernameLogin);
        console.log("Username login result:", result);
      }
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  const passwordValue = watch("password");

  return (
    <YStack justifyContent="center" gap={24} padding={30} height="100%">
      <Text fontWeight="bold" fontSize={50}>
        Hey !
      </Text>

      <YStack gap={4}>
        <Label>Nom d'utilisateur ou adresse e-mail :</Label>
        <Controller
          control={control}
          name="identifier"
          rules={{
            required: "Ce champ est requis",
            validate: (value: string) => {
              const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);
              return isEmail || isUsername || "Saisissez un email ou un nom d'utilisateur valide (3-20 caractères)";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={0}
              value={value}
              onChangeText={onChange}
              placeholder="email@domaine.com ou nom_utilisateur"
              autoCapitalize="none"
            />
          )}
        />
        {errors.identifier && <Text color="red">{errors.identifier.message}</Text>}
      </YStack>

      <YStack gap={4}>
        <Label>Mot de passe :</Label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Mot de passe requis",
            minLength: { value: 8, message: "Au moins 8 caractères" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={0}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              placeholder="••••••••"
            />
          )}
        />
        {errors.password && <Text color="red">{errors.password.message}</Text>}
      </YStack>

      {loginError && <Text color="red" style={{ textAlign: "center" }}>{loginError}</Text>}

      <Button
        borderColor="#FEBB1B"
        borderWidth={2}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || loading}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
    </YStack>
  );
}
