import { Alert, Image, Pressable, StyleSheet } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewPostModal } from "@/components/newPostModal";
import { NewCommentModal } from "@/components/NewCommentModal";
import { Link, useNavigation } from "expo-router";
import PostProfilePicture from "../../components/PostProfilePicture";
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [commentsModalContent, setCommentsModalContent] = useState([]);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [newCommentModalVisible, setNewCommentModalVisible] = useState(false);
  const [user, setUser] = useState<String>("");

  const getUSer = async () => {
    const user = await AsyncStorage.getItem("userId");
    return user;
  };
  useEffect(() => {
    getUSer().then((user) => {
      setUser(user as string);
    });
  }, []);

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
  const handlePressNewPostModal = () => {
    setNewPostModalVisible(true);
  };
  const handlePressNewCommentModal = (post: String) => {
    setModalContent([post as never]);
    setNewCommentModalVisible(true);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView >
        <ThemedView style={styles.header}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("@/assets/images/tesjohub-logo.png")}
          />
          <ThemedButton onPress={() => handlePressNewPostModal()}>
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
      <NewPostModal
        modalVisible={newPostModalVisible}
        modalContent={[]}
        refresh={refetch}
        setModalVisible={setNewPostModalVisible}
      />
      <NewCommentModal
        modalVisible={newCommentModalVisible}
        modalContent={modalContent}
        refresh={refetch}
        setModalVisible={setNewCommentModalVisible}
      />
      <ThemedView>
        {posts &&
          posts?.map((item: Post, index: any) => (
            <ThemedView isBordered key={index} style={styles.postContainer}>
              <ThemedView style={styles.postHeader}>
                <ThemedView style={styles.userInfo}>
                  <PostProfilePicture item={item} />
                  <ThemedView>
                    <ThemedText style={styles.userName}>
                      {item.user.username}
                    </ThemedText>
                    <ThemedText style={styles.postTime}>
                      {moment(item.time).fromNow()}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedText>...</ThemedText>
              </ThemedView>
              <ThemedText style={styles.post}>{item.postText}</ThemedText>
              {item.postImg !== null ? (
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
                  {item.likes.find(
                    (like) => like.user.id.toString() === user.toString()
                  ) ? (
                    <TabBarIcon
                      name="heart"
                      color="red"
                      style={{ marginRight: 5 }}
                    />
                  ) : (
                    <TabBarIcon
                      onPress={() => likePost(item.id)}
                      name="heart"
                      color="gray"
                      style={{ marginRight: 5 }}
                    />
                  )}
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
                    onPress={() => handlePressNewCommentModal(item.id)}
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
