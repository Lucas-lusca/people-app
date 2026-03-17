import { addMessage, getMessages } from "@/src/store/chatStore";
import { Message } from "@/src/types/Message";
import { User } from "@/src/types/User";
import { NavigationProp, StaticScreenProps, useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type Props = StaticScreenProps<{
    user: User;
}>;

export function Chat({ route }: Props) {

    const { user } = route.params;

    type RootStackParamList = ReactNavigation.RootParamList;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [messages, setMessages] = useState<Message[]>(getMessages(user));

    const [input, setInput] = useState("");
    const flatListRef = useRef<FlatList>(null);

    function handleSend() {
        if (!input.trim()) {
            return
        };

        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            isMe: true,
        };

        setMessages(prev => [...prev, newMessage]);

        addMessage(user, newMessage);

        setInput("");

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
    }

    function renderItem({ item }: { item: Message }) {
        return (
            <View
                style={[
                    styles.messageWrapper,
                    item.isMe ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" },
                ]}
            >
                <View
                    style={[
                        styles.messageContainer,
                        item.isMe ? styles.myMessage : styles.otherMessage,
                    ]}
                >
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        );

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
                    <Image source={{ uri: user.picture.large }} style={styles.headerAvatar} />
                </TouchableOpacity>

                <View>
                    <Text style={styles.headerName}>
                        {user.name.first} {user.name.last}
                    </Text>

                    <Text style={styles.headerStatus}>Online</Text>
                </View>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.messagesList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Digite uma mensagem..."
                    style={styles.input}
                />

                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5ddd5",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 12,
        backgroundColor: "#fff",

        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    headerName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },

    headerStatus: {
        fontSize: 12,
        color: "#4caf50",
    },

    messagesList: {
        padding: 12,
        paddingBottom: 20,
    },

    messageWrapper: {
        flexDirection: "row",
        marginBottom: 8,
    },

    messageContainer: {
        maxWidth: "75%",
        padding: 10,
        borderRadius: 12,
    },

    myMessage: {
        backgroundColor: "#dcf8c6",
    },

    otherMessage: {
        backgroundColor: "#fff",
    },

    messageText: {
        fontSize: 14,
        color: "#111",
        flexWrap: "wrap",
    },

    inputContainer: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 40,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },

    input: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
    },

    sendButton: {
        marginLeft: 8,
        backgroundColor: "#2563eb",
        borderRadius: 20,
        paddingHorizontal: 16,
        justifyContent: "center",
    },

    sendText: {
        color: "#fff",
        fontWeight: "600",
    },
});