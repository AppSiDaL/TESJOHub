import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const Posts = [
    {
      id: "1",
      userName: "Jenny Doe",
      userImg: "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      postTime: "4 mins ago",
      post: "Hey there, this is my test for a post of my social app in React Native.",
      postImg:
        "https://media.publit.io/file/ZKyHDhnApWjkCODtX74IqkhrL52oOdJrMypbBaLZin09f42tuaA/Partidos-politicos-Mexico.jpg",
      liked: true,
      likes: "14",
      comments: [
        {
          id: "1",
          userName: "John Doe",
          commentText: "This is hilarious!",
        },
        {
          id: "2",
          userName: "Ken William",
          commentText: "I know right?!",
        },
        {
          id: "3",
          userName: "Selina Paul",
          commentText: "Wow!",
        },
      ],
    },
    {
      id: "2",
      userName: "John Doe",
      userImg: "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      postTime: "2 hours ago",
      post: "Hey there, this is my test for a post of my social app in React Native.",
      postImg: "none",
      liked: false,
      likes: "8",
      comments: [],
    },
    {
      id: "3",
      userName: "Ken William",
      userImg: "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      postTime: "1 hours ago",
      post: "Hey there, this is my test for a post of my social app in React Native.",
      postImg:
        "https://media.publit.io/file/ZKyHDhnApWjkCODtX74IqkhrL52oOdJrMypbBaLZin09f42tuaA/FVT7HYTJF2SVT0C.webp",
      liked: true,
      likes: "1",
      comments: [],
    },
    {
      id: "4",
      userName: "Selina Paul",
      userImg: "https://avatars.githubusercontent.com/u/6820?s=400&u=3b7f6b2f",
      postTime: "1 day ago",
      post: "Hey there, this is my test for a post of my social app in React Native.",
      postImg:
        "https://media.publit.io/file/ZKyHDhnApWjkCODtX74IqkhrL52oOdJrMypbBaLZin09f42tuaA/unnamed.png",
      liked: true,
      likes: "22",
      comments: [
        {
          id: "1",
          userName: "Ken William",
          commentText: "This is hilarious!",
        },
        {
          id: "2",
          userName: "Jenny Doe",
          commentText: "I know right?!",
        },
      ],
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView>
        {Posts.map((item, index) => (
          <ThemedView key={index} style={styles.postContainer}>
            <ThemedView style={styles.postHeader}>
              <ThemedView style={styles.userInfo}>
                <Image
                  style={styles.userImg}
                  source={{ uri: item.userImg }}
                />
                <ThemedView>
                  <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                  <ThemedText style={styles.postTime}>{item.postTime}</ThemedText>
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
              <ThemedView style={styles.postFooter}>
                <ThemedText style={styles.postLikes}>{item.likes} Likes</ThemedText>
              </ThemedView>
              <ThemedView style={styles.postFooter}>
                <ThemedText style={styles.postLikes}>{item.comments.length} comments</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
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
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  postLikes: {
    fontSize: 14,
  },
});
