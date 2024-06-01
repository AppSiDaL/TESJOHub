import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import moment from "moment";
import { ThemedViewPressable } from "@/components/ThemedViewPressable";
import { ThemedLikesModal } from "@/components/ThemedLikesModal";
import { ThemedCommentsModal } from "@/components/ThemedCommentsModal";
import { useState } from "react";
export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [commentsModalContent, setCommentsModalContent] = useState([]);
  const data = {
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    email: "joh@gmail.com",
    avatarImage:
      "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
    coverImage:
      "https://missionmeans.com/wp-content/uploads/2020/04/nexum-leadership-banner.jpg",
    posts: [
      {
        id: "1",
        userName: "Jenny Doe",
        userImg:
          "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
        time: "01/06/2024 08:20",
        post: "Hey there, this is my test for a post of my social app in React Native.",
        postImg:
          "https://media.publit.io/file/ZKyHDhnApWjkCODtX74IqkhrL52oOdJrMypbBaLZin09f42tuaA/Partidos-politicos-Mexico.jpg",
        likes: [
          {
            id: "1",
            userName: "John Doe",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
          },
          {
            id: "2",
            userName: "Ken William",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
          },
        ],
        comments: [
          {
            id: "1",
            userName: "John Doe",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
            commentText: "This is hilarious!",
          },
          {
            id: "2",
            userName: "Ken William",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
            commentText: "I know right?!",
          },
          {
            id: "3",
            userName: "Selina Paul",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",

            commentText: "Wow!",
          },
        ],
      },
      {
        id: "2",
        userName: "John Doe",
        userImg:
          "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
        time: "01/06/2024 8:20",
        post: "Hey there, this is my test for a post of my social app in React Native.",
        postImg: "none",
        likes: [
          {
            id: "1",
            userName: "John Doe",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
          },
          {
            id: "2",
            userName: "Ken William",
            avatarUrl:
              "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
          },
        ],
        comments: [],
      },
    ],
    friends: [
      {
        id: "1",
        userName: "John Doe",
        avatarUrl:
          "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      },
      {
        id: "2",
        userName: "Ken William",
        avatarUrl:
          "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      },
    ],
  };
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
          <Image source={{ uri: data.coverImage }} style={styles.headerImage} />
          <Image
            source={{ uri: data.avatarImage }}
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
          <ThemedText type="title">{data.name}</ThemedText>
          <ThemedView style={styles.friendsAvatars}>
            {data.friends.slice(0, 3).map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.avatarUrl }}
                style={[styles.friendsImg, { left: index * 20 }]}
              />
            ))}
            {data.friends.length > 3 && (
              <ThemedText style={{ marginLeft: 70 }}>...</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.bio}>{data.bio}</ThemedText>
      </ThemedView>
      {data.posts.map((item, index) => (
        <ThemedView isBordered key={index} style={styles.postContainer}>
          <ThemedView style={styles.postHeader}>
            <ThemedView style={styles.userPostInfo}>
              <Image style={styles.userImg} source={{ uri: item.userImg }} />
              <ThemedView>
                <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                <ThemedText style={styles.postTime}>
                  {moment(item.time, "DD/MM/YYYY H:mm").fromNow()}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText>...</ThemedText>
          </ThemedView>
          <ThemedText style={styles.post}>{item.post}</ThemedText>
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
