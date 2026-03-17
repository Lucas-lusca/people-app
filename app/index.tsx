import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import apiConnection from "./services/api";

export default function Index() {

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      padding: 10,
    },

    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 12,
      marginBottom: 10,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },

    info: {
      marginLeft: 12,
      justifyContent: "center",
    },

    name: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },

    text: {
      fontSize: 13,
      color: "#555",
    },

    loading: {
      textAlign: "center",
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      {error && (
        <Text style={{ textAlign: "center", color: "red", marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}

        renderItem={({ item }) => (
          <View style={styles.card}>

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
          </View>
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