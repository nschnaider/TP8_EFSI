import { View, Text, Image, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Post } from "../../types/Post";

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onLike: (id: string) => void;
}

// Modal nativo de RN — equivalente directo al modal-overlay del web
const PostModal = ({ post, onClose, onLike }: PostModalProps) => {
  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Publicación</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView>
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

          <Image source={{ uri: post.imageUrl }} style={styles.image} />

          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={() => onLike(post.id)} style={styles.actionBtn}>
              <Ionicons
                name={post.liked ? "heart" : "heart-outline"}
                size={28}
                color={post.liked ? "#e1306c" : "#e6edf3"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={26} color="#e6edf3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="paper-plane-outline" size={26} color="#e6edf3" />
            </TouchableOpacity>
          </View>

          <Text style={styles.likes}>{post.likes.toLocaleString()} Me gusta</Text>

          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>{post.username} </Text>
            {post.caption}
          </Text>

          <View style={styles.commentsSection}>
            {post.comments.map((comment, index) => (
              <View key={index} style={styles.commentRow}>
                <Image
                  source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}` }}
                  style={styles.commentAvatar}
                />
                <Text style={styles.commentText}>
                  <Text style={styles.captionUsername}>{comment.username} </Text>
                  {comment.text}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.date}>{post.date}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e1726", paddingTop: 50 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.08)" },
  headerTitle: { color: "#ffffff", fontWeight: "700", fontSize: 15 },
  userRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#1a2740" },
  username: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
  location: { color: "#8b949e", fontSize: 12 },
  image: { width: "100%", aspectRatio: 1, backgroundColor: "#1a2740" },
  actionsRow: { flexDirection: "row", paddingHorizontal: 8, paddingTop: 10 },
  actionBtn: { padding: 6 },
  likes: { color: "#ffffff", fontWeight: "700", fontSize: 14, paddingHorizontal: 12, marginTop: 4 },
  caption: { color: "#e6edf3", fontSize: 14, paddingHorizontal: 12, paddingTop: 6, paddingBottom: 4 },
  captionUsername: { fontWeight: "700", color: "#ffffff" },
  commentsSection: { paddingHorizontal: 12, paddingTop: 8, gap: 10 },
  commentRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  commentAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#1a2740" },
  commentText: { color: "#e6edf3", fontSize: 13, flex: 1 },
  date: { color: "#8b949e", fontSize: 11, padding: 12, marginTop: 4 },
});

export default PostModal;