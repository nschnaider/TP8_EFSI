import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Post } from "../../types/Post";

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onOpenPost: (post: Post) => void;
}

const PostCard = ({ post, onLike, onOpenPost }: PostCardProps) => {
  return (
    // Tocar la tarjeta entera abre el detalle del post
    <TouchableOpacity activeOpacity={0.95} onPress={() => onOpenPost(post)}>
      <View style={styles.card}>

        {/* Header: avatar, username y ubicación simulada */}
        <View style={styles.userRow}>
          <Image
            source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}` }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.location}>{post.location}</Text>
          </View>
        </View>

        {/* Imagen principal del post */}
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

        {/* Barra de acciones: like, comentar, compartir */}
        <View style={styles.actionsRow}>
          {/* stopPropagation no existe en RN — en su lugar el botón de like
              tiene su propio TouchableOpacity, separado del de la tarjeta,
              así no se disparan los dos toques al mismo tiempo */}
          <TouchableOpacity onPress={() => onLike(post.id)} style={styles.actionBtn}>
            <Ionicons
              name={post.liked ? "heart" : "heart-outline"}
              size={26}
              color={post.liked ? "#e1306c" : "#e6edf3"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onOpenPost(post)} style={styles.actionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color="#e6edf3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="paper-plane-outline" size={24} color="#e6edf3" />
          </TouchableOpacity>
        </View>

        {/* Contador de likes */}
        <Text style={styles.likes}>{post.likes.toLocaleString()} Me gusta</Text>

        {/* Caption: username + descripción en la misma línea */}
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0e1726",
    marginBottom: 12,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1a2740",
  },
  username: { color: "#ffffff", fontWeight: "700", fontSize: 13 },
  location: { color: "#8b949e", fontSize: 11 },
  postImage: {
    width: "100%",
    aspectRatio: 1, // imagen cuadrada, igual que Instagram real
    backgroundColor: "#1a2740",
  },
  actionsRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  actionBtn: { padding: 6 },
  likes: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
    paddingHorizontal: 12,
    marginTop: 2,
  },
  caption: {
    color: "#e6edf3",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
  },
  captionUsername: { fontWeight: "700", color: "#ffffff" },
});

export default PostCard;