import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "@/components/ModalChat";
import ChatComponent from "@/components/ChatComponent";
import socket from "@/utils/socket";
import { API_URL } from "@/constants";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
export default function Chat() {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch(API_URL + "chats")
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on("roomsList", (rooms: any) => {
      setRooms(rooms);
    });
  }, [socket]);

  const handleCreateGroup = () => setVisible(true);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView style={styles.chatscreen}>
        <ThemedView style={styles.chattopContainer}>
          <ThemedView style={styles.chatheader}>
            <ThemedText style={styles.chatheading}>Chats</ThemedText>
            <Pressable onPress={handleCreateGroup}>
              <Feather name="edit" size={24} color="green" />
            </Pressable>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.chatlistContainer}>
          {rooms.length > 0 ? (
            <FlatList
              data={rooms as { id: string }[]} // Add type annotation for rooms
              renderItem={({ item }) => <ChatComponent item={item as any} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <ThemedView style={styles.chatemptyContainer}>
              <ThemedText style={styles.chatemptyText}>No rooms created!</ThemedText>
              <ThemedText>Click the icon above to create a Chat room</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
        {visible ? <Modal setVisible={setVisible} /> : ""}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  chatscreen: {
    flex: 1,
    padding: 10,
    position: "relative",
  },
  chatheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  chattopContainer: {
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
  },
  chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
});
