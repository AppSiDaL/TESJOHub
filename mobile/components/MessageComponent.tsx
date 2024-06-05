import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface MessageComponentProps {
  item: {
    user: string;
    text: string;
    time: string;
  };
  user: string;
}
export default function MessageComponent({
  item,
  user,
}: MessageComponentProps) {
  const status = item.user !== user;
  console.log(item, "-------", user);

  return (
    <ThemedView>
      <ThemedView
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
          {status && (
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="gray"
              style={styles.mvatar}
            />
          )}
          <ThemedView
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
            }
          >
            <Text>{item.text}</Text>
          </ThemedView>
        </ThemedView>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
});
