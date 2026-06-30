import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "../data/user";
import { formatNum } from "../data/user";
import type { Post } from "../types/Post";

interface ProfileScreenProps {
  user: User;
  onOpenPost: (post: Post) => void;
  navigation: any;
}

const ProfileScreen = ({ user, onOpenPost, navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={user.posts}
        keyExtractor={(item) => item.id}
        numColumns={3} // EXIGENCIA DE LA CONSIGNA: grilla de 3 columnas
        ListHeaderComponent={
          <View style={styles.profileInfo}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.fullName}>{user.fullName}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{user.posts.length}</Text>
                <Text style={styles.statLabel}>publicaciones</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatNum(user.followers)}</Text>
                <Text style={styles.statLabel}>seguidores</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatNum(user.following)}</Text>
                <Text style={styles.statLabel}>seguidos</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => onOpenPost(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0e1726" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  profileInfo: { alignItems: "center", paddingVertical: 20, paddingHorizontal: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#1a2740" },
  fullName: { color: "#ffffff", fontWeight: "700", fontSize: 16, marginTop: 12 },
  bio: { color: "#8b949e", fontSize: 13, marginTop: 4, textAlign: "center" },
  statsRow: { flexDirection: "row", gap: 28, marginTop: 16 },
  stat: { alignItems: "center" },
  statNumber: { color: "#ffffff", fontWeight: "700", fontSize: 15 },
  statLabel: { color: "#8b949e", fontSize: 11, marginTop: 2 },
  editBtn: { marginTop: 16, paddingVertical: 8, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  editBtnText: { color: "#e6edf3", fontWeight: "600", fontSize: 13 },
  gridItem: { width: "33.33%", aspectRatio: 1, padding: 1 },
  gridImage: { width: "100%", height: "100%", backgroundColor: "#1a2740" },
});

export default ProfileScreen;