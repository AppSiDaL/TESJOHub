


import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList,StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "@/components/ModalChat";
import ChatComponent from "@/components/ChatComponent";
import socket from "@/utils/socket";
import { API_URL } from "@/constants";
export default function Chat() {
	const [visible, setVisible] = useState(false);
	const [rooms, setRooms] = useState([]);

	useLayoutEffect(() => {
		function fetchGroups() {
			fetch(API_URL + "/chats")
				.then((res) => res.json())
				.then((data) => setRooms(data))
				.catch((err) => console.error(err));
		}
		fetchGroups();
	}, []);

	useEffect(() => {
		socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socket]);

	const handleCreateGroup = () => setVisible(true);

	return (
		<SafeAreaView style={styles.chatscreen}>
			<View style={styles.chattopContainer}>
				<View style={styles.chatheader}>
					<Text style={styles.chatheading}>Chats</Text>
					<Pressable onPress={handleCreateGroup}>
						<Feather name='edit' size={24} color='green' />
					</Pressable>
				</View>
			</View>

			<View style={styles.chatlistContainer}>
				{rooms.length > 0 ? (
					<FlatList
						data={rooms}
						renderItem={({ item }) => <ChatComponent item={item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<View style={styles.chatemptyContainer}>
						<Text style={styles.chatemptyText}>No rooms created!</Text>
						<Text>Click the icon above to create a Chat room</Text>
					</View>
				)}
			</View>
			{visible ? <Modal setVisible={setVisible} /> : ""}
		</SafeAreaView>
	);
};


const styles = StyleSheet.create({
  chatscreen: {
		backgroundColor: "#F7F7F7",
		flex: 1,
		padding: 10,
		position: "relative",
	},
	chatheading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "green",
	},
	chattopContainer: {
		backgroundColor: "#F7F7F7",
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginBottom: 15,
		elevation: 2,
	},
	chatheader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	chatlistContainer: {
		paddingHorizontal: 10,
	},
	chatemptyContainer: {
		width: "100%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
})

