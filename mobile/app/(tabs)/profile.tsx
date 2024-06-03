import { StyleSheet, Image, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import moment from "moment";
import { ThemedViewPressable } from "@/components/ThemedViewPressable";
import { ThemedLikesModal } from "@/components/ThemedLikesModal";
import { ThemedCommentsModal } from "@/components/ThemedCommentsModal";
import { useState } from "react";
import postsService from "@/services/postsService";
import { useQuery } from "react-query";
import userService from "@/services/userService";
import { Post, User } from "@/types";
import { defaultAvatar, defaultCover } from "@/constants";
export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [commentsModalContent, setCommentsModalContent] = useState([]);
  const fetchUser = async () => {
    const response = await userService.getUserInfo();
    console.log(response);
    return response.data;
  };
  const { data: user } = useQuery("user", fetchUser);
  const fetchPosts = async () => {
    const response = await postsService.getUserPosts();
    return response.data;
  };

  const { data: posts, error, isLoading } = useQuery("posts", fetchPosts);

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
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <Image
            source={{ uri: user.coverUrl ?? defaultCover }}
            style={styles.headerImage}
          />
          <Image
            source={{ uri: user.avatarImage ?? defaultAvatar }}
            style={styles.avatarImage}
          />
        </ThemedView>
      }
    >
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
        <ThemedView style={styles.userData}>
          <ThemedText type="title">{user.name}</ThemedText>
          <ThemedView style={styles.friendsAvatars}>
            {user.friends.slice(0, 3).map((item: User, index: number) => (
              <Image
                key={index}
                source={{ uri: item.avatarUrl ?? defaultAvatar }}
                style={[styles.friendsImg, { left: index * 20 }]}
              />
            ))}
            {user.friends.length > 3 && (
              <ThemedText style={{ marginLeft: 70 }}>...</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.bio}>{user.bio}</ThemedText>
      </ThemedView>
      {posts.map((item: Post, index: number) => (
        <ThemedView isBordered key={index} style={styles.postContainer}>
          <ThemedView style={styles.postHeader}>
            <ThemedView style={styles.userPostInfo}>
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
              <ThemedText style={styles.postLikes}>
                {item.likes.length} Likes
              </ThemedText>
            </ThemedViewPressable>
            <ThemedViewPressable
              style={styles.postFooter}
              onPress={() => handlePressCommentsModal(item.comments)}
            >
              <ThemedText style={styles.postLikes}>
                {item.comments.length} comments
              </ThemedText>
            </ThemedViewPressable>
          </ThemedView>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  friendsImg: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginLeft: 20,
    position: "absolute",
  },
  bio: {
    marginTop: 10,
  },
  friendsAvatars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userData: {
    flexDirection: "row",
    margin: -10,
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
  },
  avatarImage: {
    position: "absolute",
    bottom: -0,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  userPostInfo: {
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
    height: 200,
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
