import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import socket from "@/utils/socket";
import MessageComponent from "@/components/MessageComponent";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedInputText } from "@/components/ThemedInputText";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const [user, setUser] = useState("gil");
  const local = useLocalSearchParams();
  console.log(local.chat);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

	const getUsername = async () => {
		try {
			const value = await AsyncStorage.getItem("userId");
			if (value !== null) {
				setUser(value);
			}
		} catch (e) {
			console.error("Error while loading username!");
		}
	};

	const handleNewMessage = () => {
		const hour =
			new Date().getHours() < 10
				? `0${new Date().getHours()}`
				: `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10
				? `0${new Date().getMinutes()}`
				: `${new Date().getMinutes()}`;

		if (user) {
			socket.emit("newMessage", {
				message,
				roomId: local.chat,
				user,
				timestamp: { hour, mins },
			});
		}
	};

	useLayoutEffect(() => {
		getUsername();
		socket.emit("findRoom", local.chat);
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, []);

  useEffect(() => {
    socket.on("foundRoom", (roomChats: any) => setChatMessages(roomChats));
  }, [socket]);

  return (
    <ThemedView style={styles.messagingscreen}>
      <ThemedView
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
          />
        ) : (
          ""
        )}
      </ThemedView>

      <ThemedView style={styles.messaginginputContainer}>
        <ThemedInputText
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <ThemedText style={{ color: "#f2f0f1", fontSize: 20 }}>
            SEND
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
