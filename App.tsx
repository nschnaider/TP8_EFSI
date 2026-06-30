import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import type { Post, Comment } from "./src/types/Post";
import { fetchCatImages } from "./src/services/api";
import { currentUser } from "./src/data/user";
import FeedScreen from "./src/screens/FeedScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import PostModal from "./src/components/PostModal/PostModal";

// Mismos datos simulados que el proyecto web
const USERNAMES = [
  "michi_gato", "catto_bravo", "felix_paws", "luna_felina",
  "garfield_jr", "whiskers99", "nala_cat", "simba_gato",
  "mittens_ok", "fluffy_arg", "tigre_gomez", "snow_paws",
];

const LOCATIONS = [
  "Buenos Aires, Argentina", "Palermo, CABA", "Villa Devoto, CABA",
  "Córdoba, Argentina", "Mendoza, Argentina", "Rosario, Argentina",
];

const CAPTIONS = [
  "Lunes otra vez...", "Mi lugar favorito del mundo",
  "No me molesten, estoy descansando", "El sol de la tarde es mío",
  "¿Alguien dijo comida?", "Explorando el jardín",
];

const COMMENTS: Comment[] = [
  { username: "michi_lover", text: "¡Qué lindo!" },
  { username: "gato_fan", text: "Me encanta esta foto" },
  { username: "cat_world", text: "Adorable!!" },
];

const getRandom = <A,>(arr: A[]): A => arr[Math.floor(Math.random() * arr.length)];

const buildPosts = (images: { id: string; url: string }[]): Post[] =>
  images.map((img, index) => ({
    id: img.id,
    imageUrl: img.url,
    username: USERNAMES[index % USERNAMES.length],
    location: getRandom(LOCATIONS),
    likes: Math.floor(Math.random() * 800) + 50,
    liked: false,
    caption: CAPTIONS[index % CAPTIONS.length],
    date: `Hace ${Math.floor(Math.random() * 23) + 1} horas`,
    comments: [getRandom(COMMENTS), getRandom(COMMENTS)],
  }));

// Stack solo para moverse entre Feed y Profile (lo mínimo que pide la consigna)
const Stack = createNativeStackNavigator();

export default function App() {
  // TODO el estado vive acá, igual que en el App.tsx del proyecto web
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const images = await fetchCatImages(12);
        setPosts(buildPosts(images));
      } catch {
        setError("No se pudieron cargar las fotos.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Misma función ClickLike del proyecto web, ahora sincroniza también selectedPost
  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    if (selectedPost?.id === id) {
      setSelectedPost((prev) =>
        prev ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 } : null
      );
    }
  };

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pasamos TODO el estado como props a las pantallas, igual que en el web */}
        <Stack.Screen name="Feed">
          {(props) => (
            <FeedScreen
              {...props}
              posts={posts}
              loading={loading}
              error={error}
              onLike={handleLike}
              onOpenPost={setSelectedPost}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              user={{ ...currentUser, posts }}
              onOpenPost={setSelectedPost}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>

      {/* El modal de detalle vive ACÁ ARRIBA de todo, igual que en App.tsx del web */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} onLike={handleLike} />
      )}
    </NavigationContainer>
    </SafeAreaProvider>
  );
}