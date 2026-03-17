import { addChat } from '@/src/store/chatStore';
import { User } from '@/src/types/User';
import { Text } from '@react-navigation/elements';
import { NavigationProp, StaticScreenProps, useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = StaticScreenProps<{
  user: User;
}>;

export function Profile({ route }: Props) {

  type RootStackParamList = ReactNavigation.RootParamList;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { user } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.picture.large }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user.name.title} {user.name.first} {user.name.last}
        </Text>

        <Text style={styles.email}>
          {user.email}
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            addChat(user);
            navigation.navigate("Chat", { user })
          }
          }
        >
          <Text style={styles.buttonText}>Mensagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Informações</Text>

        <Text style={styles.text}>Gênero: {user.gender}</Text>
        <Text style={styles.text}>Idade: {user.dob.age}</Text>
        <Text style={styles.text}>Telefone: {user.phone}</Text>
        <Text style={styles.text}>Celular: {user.cell}</Text>
        <Text style={styles.text}>Nacionalidade: {user.nat}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Endereço</Text>

        <Text style={styles.text}>
          {user.location.street.number}, {user.location.street.name}
        </Text>

        <Text style={styles.text}>
          {user.location.city} - {user.location.state}
        </Text>

        <Text style={styles.text}>
          {user.location.country}
        </Text>

        <Text style={styles.text}>
          CEP: {user.location.postcode}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Conta</Text>

        <Text style={styles.text}>
          Username: {user.login.username}
        </Text>

        <Text style={styles.text}>
          UUID: {user.login.uuid}
        </Text>

        <Text style={styles.text}>
          Registrado há: {user.registered.age} anos
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,

    borderWidth: 3,
    borderColor: "#eaeaea",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: "#777",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,

    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },

  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    lineHeight: 20,
  },

});