import { getChats } from "@/src/store/chatStore";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Messages() {

  type RootStackParamList = ReactNavigation.RootParamList;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      setData([...getChats()]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.user.login.uuid}
        contentContainerStyle={styles.content}

        renderItem={({ item }) => {
          const user = item.user;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Chat", { user })}
            >
              <Image
                source={{ uri: user.picture?.thumbnail }}
                style={styles.avatar}
              />

              <View style={styles.info}>
                <Text style={styles.name}>
                  {user.name.first} {user.name.last}
                </Text>
                <Text style={styles.subtitle}>
                  Toque para conversar
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
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

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#eaeaea",
  },

  info: {
    marginLeft: 14,
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
  },

});