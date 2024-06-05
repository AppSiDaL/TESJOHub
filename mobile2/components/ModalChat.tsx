import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedInputText } from "./ThemedInputText";

interface ModalChatProps{
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalChat({ setVisible }:ModalChatProps) {
  const closeModal = () => setVisible(false);
  const [groupName, setGroupName] = useState("");

  const handleCreateRoom = () => {
    socket.emit("createRoom", groupName);
    closeModal();
  };
  return (
    <ThemedView style={styles.modalContainer}>
      <ThemedText style={styles.modalsubheading}>Enter your Group name</ThemedText>
      <ThemedInputText
        style={styles.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />
      <ThemedView style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <ThemedText style={styles.modaltext}>CREATE</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <ThemedText style={styles.modaltext}>CANCEL</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modaltext: {
  },
  modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    position: "absolute",
    bottom: -200,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalbutton: {
    width: "40%",
    height: 45,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
},
});
