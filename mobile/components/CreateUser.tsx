import {
  FlatList,
  Modal,
  Pressable,
  PressableProps,
  View,
  type ViewProps,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { Comment } from "@/types";
import { ThemedInputText } from "./ThemedInputText";
import { useState } from "react";
import userService from "@/services/userService";
import { ThemedButton } from "./ThemedButton";
import ParallaxScrollView from "./ParallaxScrollView";

export type ThemedViewPropsPressable = ViewProps &
  PressableProps & {
    lightColor?: string;
    darkColor?: string;
    modalVisible: boolean;
    modalContent?: Comment[];
    refresh?: () => void;
    setModalVisible: (visible: boolean) => void;
  };

export function NewUSerModal({
  style,
  lightColor,
  darkColor,
  modalVisible,
  modalContent,
  setModalVisible,
  refresh,
  ...otherProps
}: ThemedViewPropsPressable) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUpload = async () => {
    const data = {
      username,
      name,
      lastName,
      email,
      password,
    };
    try {
      await userService.createItem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(!modalVisible);
    }
  };
  return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ThemedView style={styles.centeredView}>
          <ThemedView style={styles.modalView}>
            <ScrollView>
              <ThemedView style={styles.headerModal}>
                <ThemedText style={styles.textStyle}>New User</ThemedText>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <ThemedText style={styles.textStyle}>
                    <TabBarIcon name="close" />
                  </ThemedText>
                </Pressable>
              </ThemedView>
              <ThemedInputText
                placeholder="username"
                value={username}
                onChangeText={(e) => setUsername(e)}
              />
              <ThemedInputText
                placeholder="name"
                value={name}
                onChangeText={(e) => setName(e)}
              />
              <ThemedInputText
                placeholder="lastName"
                value={lastName}
                onChangeText={(e) => setLastName(e)}
              />
              <ThemedInputText
                placeholder="email"
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
              <ThemedInputText
                placeholder="password"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
              <TabBarIcon
                name="person-add"
                color="green"
                onPress={handleUpload}
              />
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "85%",
  },
  commentView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  likeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    overflow: "scroll",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: "50%",
    width: "80%",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  commentUser: {
    fontWeight: "600",
  },
});
