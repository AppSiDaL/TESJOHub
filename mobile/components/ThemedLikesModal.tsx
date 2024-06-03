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
import { Like } from "@/types";

export type ThemedViewPropsPressable = ViewProps &
  PressableProps & {
    lightColor?: string;
    darkColor?: string;
    modalVisible: boolean;
    modalContent: Like[];
    setModalVisible: (visible: boolean) => void;
  };

export function ThemedLikesModal({
  style,
  lightColor,
  darkColor,
  modalVisible,
  modalContent,
  setModalVisible,
  ...otherProps
}: ThemedViewPropsPressable) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  console.log(modalContent)
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
            <ThemedText style={styles.textStyle}>{modalContent.length} Likes</ThemedText>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <ThemedText style={styles.textStyle}>
              <TabBarIcon name="close" />
              </ThemedText>
            </Pressable>
          </ThemedView>
          <FlatList
            data={modalContent}
            renderItem={({ item }) => (
              <ThemedView style={styles.likeView}>
                <Image
                  style={styles.userImg}
                  source={{ uri: item.user.avatarUrl?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSKAYL6jLWu96azBLYuApNGc4mLX_oqgjJAg&s"}}
                />
                <ThemedText style={styles.modalText}>
                  {item.user.username}
                </ThemedText>
              </ThemedView>
            )}
            keyExtractor={(item) => item.id}
          />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerModal:{
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
    height: "30%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
