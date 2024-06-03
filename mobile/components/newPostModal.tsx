import {
  FlatList,
  Modal,
  Pressable,
  PressableProps,
  View,
  type ViewProps,
  StyleSheet,
  Image,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { ThemedCard } from "./ThemedCard";
import { Comment } from "@/types";
import { defaultAvatar } from "@/constants";
import { ThemedInputText } from "./ThemedInputText";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import postsService from "@/services/postsService";

export type ThemedViewPropsPressable = ViewProps &
  PressableProps & {
    lightColor?: string;
    darkColor?: string;
    modalVisible: boolean;
    modalContent: Comment[];
    refresh: () => void;
    setModalVisible: (visible: boolean) => void;
  };

export function NewPostModal({
  style,
  lightColor,
  darkColor,
  modalVisible,
  modalContent,
  setModalVisible,
  refresh,
  ...otherProps
}: ThemedViewPropsPressable) {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri as any);
    }
  };

  const handleUpload = async () => {
    const data = new FormData();
    if (image) {
      data.append("file", (image as any).uri);
    }
    data.append(
      "datos",
      JSON.stringify({
        time: new Date().toISOString(),
        postText: postContent,
      })
    );
    try {
      await postsService.createItem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(!modalVisible);
      refresh()
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
          <ThemedView style={styles.headerModal}>
            <ThemedText style={styles.textStyle}>New Post</ThemedText>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <ThemedText style={styles.textStyle}>
                <TabBarIcon name="close" />
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedInputText
            placeholder="Content"
            value={postContent}
            onChangeText={(e) => setPostContent(e)}
          />
          <ThemedButton onPress={pickImage}>
            <ThemedText>Upload Image</ThemedText>
          </ThemedButton>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          )}
          <TabBarIcon name="add-circle" color="green" onPress={handleUpload} />
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
