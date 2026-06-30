import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Recibe una función para navegar al perfil cuando tocás el ícono
interface HeaderProps {
  onProfilePress: () => void;
}

const Header = ({ onProfilePress }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {/* Logo de Instagram a la izquierda */}
      <Text style={styles.logo}>Instagram</Text>

      {/* Íconos de acción a la derecha */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="heart-outline" size={24} color="#e6edf3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="paper-plane-outline" size={24} color="#e6edf3" />
        </TouchableOpacity>
        {/* Tocar el avatar te lleva al perfil */}
        <TouchableOpacity style={styles.iconBtn} onPress={onProfilePress}>
          <Ionicons name="person-circle-outline" size={26} color="#e6edf3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#0e1726",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  logo: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "700",
    color: "#ffffff",
  },
  actions: {
    flexDirection: "row",
    gap: 4,
  },
  iconBtn: {
    padding: 6,
  },
});

export default Header;