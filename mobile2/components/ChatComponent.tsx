import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface ChatComponentProps {
  item: {
    id: string;
    name: string;
    messages: {
      user: string;
      text: string;
      time: string;
    }[];
  };

}
export default function ChatComponent({ item }: ChatComponentProps) {
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);
  return (
    <Link to={`/chat/${item.id}`}>
      <ThemedView style={styles.cchat}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="gray"
          style={styles.cavatar}
        />

        <ThemedView style={styles.crightContainer}>
          <ThemedView>
            <ThemedText style={styles.cusername}>{item.name}</ThemedText>
            <ThemedText style={styles.cmessage}>
              {(messages as any)?.text ? (messages as any)?.text : "Tap to start chatting"}
            </ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText style={styles.ctime}>
              {(messages as any)?.time ? (messages as any)?.time : "now"}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
});
