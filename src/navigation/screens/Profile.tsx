import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import React from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native';

type User = {
  gender: string;
  email: string;
  phone: string;
  cell: string;
  nat: string;

  name: {
    title: string;
    first: string;
    last: string;
  };

  picture: {
    large: string;
  };

  dob: {
    age: number;
  };

  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };

  login: {
    username: string;
    uuid: string;
  };

  registered: {
    age: number;
  };
};

type Props = StaticScreenProps<{
  user: User;
}>;

export function Profile({ route }: Props) {
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