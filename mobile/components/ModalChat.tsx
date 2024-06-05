import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";

export default function ModalChat({ setVisible }) {
  const closeModal = () => setVisible(false);
  const [groupName, setGroupName] = useState("");

  const handleCreateRoom = () => {
    socket.emit("createRoom", groupName);
    closeModal();
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />
      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modaltext: {
    color: "#fff",
  },
  modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
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
    color: "#fff",
},
});
