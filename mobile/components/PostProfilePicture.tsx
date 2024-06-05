// PostProfilePicture.ios.tsx
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { defaultAvatar } from "@/constants";

interface PostProfilePictureProps {
  item: any;
}

export default function PostProfilePicture({ item }: PostProfilePictureProps) {
  // código específico de iOS
  return (
    <Link href={`/user/${item.user.id}`}>
      <Image
        style={styles.userImg}
        source={{ uri: item.user.avatarUrl ?? defaultAvatar }}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
