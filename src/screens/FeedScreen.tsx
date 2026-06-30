import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Post } from "../types/Post";
import Header from "../components/Header/Header";
import PostCard from "../components/Post/PostCard";

// Recibe TODO por props desde App.tsx, no tiene estado propio
interface FeedScreenProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onLike: (id: string) => void;
  onOpenPost: (post: Post) => void;
  navigation: any; // viene de React Navigation
}

const FeedScreen = ({ posts, loading, error, onLike, onOpenPost, navigation }: FeedScreenProps) => {
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#e1306c" />
        <Text style={styles.loadingText}>Cargando fotos de gatos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header onProfilePress={() => navigation.navigate("Profile")} />
      {/* FlatList obligatoria por consigna, nada de .map() */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={onLike} onOpenPost={onOpenPost} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e1726" },
  listContent: { paddingBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0e1726", gap: 12 },
  loadingText: { color: "#8b949e", fontSize: 14 },
  errorText: { color: "#e74c3c", fontSize: 14 },
});

export default FeedScreen;