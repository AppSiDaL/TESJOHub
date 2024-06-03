export interface User {
    username: string;
    name: string;
    lastName: string;
    avatarUrl: string | null;
    coverUrl: string | null;
    id: string;
}

export interface Like {
    user: User;
    id: string;
}

export interface Comment {
    commentText: string;
    user: User;
    id: string;
}

export interface Post {
    user: User;
    time: string;
    postText: string;
    postImg: string;
    likes: Like[];
    comments: Comment[];
    id: string;
}