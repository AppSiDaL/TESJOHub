import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { router } from "expo-router";
export default function ChatComponent({ item }) {
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);
  return (
    <Link to={`/chat/${item.id}`}>
      <View style={styles.cchat}>
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.cavatar}
        />

        <View style={styles.crightContainer}>
          <View>
            <Text style={styles.cusername}>{item.name}</Text>

            <Text style={styles.cmessage}>
              {messages?.text ? messages.text : "Tap to start chatting"}
            </Text>
          </View>
          <View>
            <Text style={styles.ctime}>
              {messages?.time ? messages.time : "now"}
            </Text>
          </View>
        </View>
      </View>
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
    backgroundColor: "#fff",
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
