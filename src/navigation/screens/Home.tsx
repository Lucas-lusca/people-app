import apiConnection from "@/src/services/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Home() {

  type RootStackParamList = ReactNavigation.RootParamList;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results: number = 10;
  const [seed, setSeed] = useState(generateSeed());

  function generateSeed(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async function getUserPagination() {
    if (loading || refreshing) {
      return
    };

    setLoading(true);
    setError(null);

    try {
      const response = await apiConnection().get(
        `/?page=${page}&results=${results}&seed=${seed}`
      );

      // O ideal é a API devolver apenas os dados necessarios para essa tela
      setData(prev => [...prev, ...response.data.results]);

      setPage(prev => prev + 1);

    } catch (error) {
      console.error(error);
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    if (refreshing || loading) {
      return
    };

    setRefreshing(true);
    setError(null);

    const newSeed = generateSeed();

    try {
      const response = await apiConnection().get(
        `/?page=1&results=${results}&seed=${newSeed}`
      );

      setData(response.data.results);
      setSeed(newSeed);
      setPage(2);

    } catch (error) {
      console.error(error);
      setError("Erro ao atualizar usuários");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getUserPagination();
  }, []);

  return (
    <View style={styles.container}>
      {error && (
        <Text style={{ textAlign: "center", color: "red", marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.login.uuid}
        contentContainerStyle={styles.content}

        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.card}
            onPress={() =>
              // Aqui, o certo é passar apenas o ID e a tela 
              // busca os dados necessarios.
              // Mas a API não tem opção de busca de ID especifico
              navigation.navigate("Profile", {
                user: item
              })
            }
          >

            <Image
              source={{ uri: item.picture?.thumbnail }}
              style={styles.avatar}
            />

            <View style={styles.info}>
              <Text style={styles.name}>
                {item.name?.first} {item.name?.last}
              </Text>

              <Text style={styles.text}>
                Gênero: {item.gender}
              </Text>

              <Text style={styles.text}>
                Idade: {item.dob?.age}
              </Text>

              <Text style={styles.text}>
                País: {item.location?.country}
              </Text>
            </View>

          </TouchableOpacity>
        )}

        onEndReached={getUserPagination}
        onEndReachedThreshold={0.5}

        refreshing={refreshing}
        onRefresh={handleRefresh}

        ListFooterComponent={
          loading ? <Text style={styles.loading}>Carregando...</Text> : null
        }
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
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    alignItems: "center",

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
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },

  text: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },

  loading: {
    textAlign: "center",
    marginVertical: 16,
    color: "#777",
  },

});