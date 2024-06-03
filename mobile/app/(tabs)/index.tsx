import { Alert, Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedViewPressable } from "@/components/ThemedViewPressable";
import { ThemedLikesModal } from "@/components/ThemedLikesModal";
import { ThemedCommentsModal } from "@/components/ThemedCommentsModal";
import moment from "moment";
import { ThemedButton } from "@/components/ThemedButton";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import postsService from "@/services/postsService";
import { Post } from "@/types";
import { useQuery } from "react-query";
import { useEffect, useCallback, useState } from "react";
import { defaultAvatar } from "@/constants";
import likeService from "@/services/likeService";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [commentsModalContent, setCommentsModalContent] = useState([]);
  const fetchPosts = async () => {
    const response = await postsService.getAllPosts();
    return response.data;
  };

  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useQuery("posts", fetchPosts);

  const likePost = async (id: string) => {
    try {
      await likeService.createItem(id);
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
    }
  };
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (error) {
    return (
      <ThemedText>An error has occurred: {(error as Error).message}</ThemedText>
    );
  }

  const handlePressLikesModal = (content: any) => {
    setModalContent(content);
    setModalVisible(true);
  };
  const handlePressCommentsModal = (content: any) => {
    setCommentsModalContent(content);
    setCommentsModalVisible(true);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView>
        <ThemedView style={styles.header}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("@/assets/images/tesjohub-logo.png")}
          />
          <ThemedButton onPress={() => alert("Create Post")}>
            <TabBarIcon name="add-circle" />
          </ThemedButton>
        </ThemedView>
        <ThemedText type="title">TESJoHUB</ThemedText>
      </ThemedView>
      <ThemedLikesModal
        modalVisible={modalVisible}
        modalContent={modalContent}
        setModalVisible={setModalVisible}
      />
      <ThemedCommentsModal
        modalVisible={commentsModalVisible}
        modalContent={commentsModalContent}
        setModalVisible={setCommentsModalVisible}
      />
      <ThemedView>
        {posts &&
          posts?.map((item: Post, index: any) => (
            <ThemedView isBordered key={index} style={styles.postContainer}>
              <ThemedView style={styles.postHeader}>
                <ThemedView style={styles.userInfo}>
                  <Image
                    style={styles.userImg}
                    source={{ uri: item.user.avatarUrl ?? defaultAvatar }}
                  />
                  <ThemedView>
                    <ThemedText style={styles.userName}>
                      {item.user.username}
                    </ThemedText>
                    <ThemedText style={styles.postTime}>
                      {moment(item.time, "DD/MM/YYYY H:mm").fromNow()}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedText>...</ThemedText>
              </ThemedView>
              <ThemedText style={styles.post}>{item.postText}</ThemedText>
              {item.postImg !== "none" ? (
                <Image
                  source={{ uri: item.postImg }}
                  style={styles.postImg}
                  resizeMode="cover"
                />
              ) : (
                <ThemedView />
              )}
              <ThemedView style={styles.postFooter}>
                <ThemedViewPressable
                  style={styles.postFooter}
                  onPress={() => handlePressLikesModal(item.likes)}
                >
                  <TabBarIcon
                    onPress={() => likePost(item.id)}
                    name="heart"
                    color="gray"
                    style={{ marginRight: 5 }}
                  />
                  <ThemedText style={styles.postLikes}>
                    {item.likes.length} Likes
                  </ThemedText>
                </ThemedViewPressable>
                <ThemedViewPressable
                  style={styles.postFooter}
                  onPress={() => handlePressCommentsModal(item.comments)}
                >
                  <TabBarIcon
                    name="chatbubble"
                    color="gray"
                    onPress={() => alert("comment")}
                    style={{ marginRight: 5 }}
                  />
                  <ThemedText style={styles.postLikes}>
                    {item.comments.length} comments
                  </ThemedText>
                </ThemedViewPressable>
              </ThemedView>
            </ThemedView>
          ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  postContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
  },
  post: {
    marginTop: 10,
    fontSize: 14,
  },
  postImg: {
    width: "100%",
    aspectRatio: 1, // Agrega esta línea
    borderRadius: 10,
    marginTop: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  postLikes: {
    fontSize: 14,
  },
});
