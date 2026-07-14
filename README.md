# TP8 EFSI — Clon Móvil de Instagram

Migración del proyecto web TP6_EFSI (React + Vite) a una app móvil con React Native y Expo.
Consume imágenes en tiempo real desde [The Cat API](https://thecatapi.com/) para simular el feed.


## Referencia visual (Figma / capturas)

Mantuve el mismo figma de referencia que en el TP6, llevandolo al objetivo que se pedía en el TP8. Link del figma: https://www.figma.com/community/file/1004033523744290376

## Cómo iniciar el proyecto

npm install
npx expo start

Escaneá el QR con la app **Expo Go** desde tu celular (abrí Expo Go primero, luego tocá "Scan QR Code").

## Estructura
TP8_EFSI/
├── App.tsx                          # Raíz: estado global, navegación y modal de detalle
├── app.json                         # Configuración Expo: ícono, splash, orientación
├── assets/
│   ├── icon.png                     # Ícono nativo de la app
│   ├── splash.png                   # Pantalla de carga
│   └── adaptive-icon.png            # Ícono adaptativo Android
└── src/
├── types/
│   └── Post.ts                  # Interfaces TypeScript: Post, Comment, CatImage
├── data/
│   └── user.ts                  # Usuario simulado + función formatNum()
├── services/
│   └── api.ts                   # Llamada a The Cat API con Axios
├── screens/
│   ├── FeedScreen.tsx           # Pantalla principal con FlatList del feed
│   └── ProfileScreen.tsx        # Pantalla de perfil con grilla de 3 columnas
└── components/
├── Header/
│   └── Header.tsx           # Barra superior con logo y accesos rápidos
├── Post/
│   └── PostCard.tsx         # Tarjeta individual del feed (ítem de FlatList)
└── PostModal/
└── PostModal.tsx        # Vista de detalle del post (modal)


## Componentes: qué hace cada uno y cómo reciben datos

### `App.tsx`
Componente raíz. Tiene **todo el estado global** de la app:
- Llama a la API con `useEffect` al iniciar
- Arma los posts combinando las imágenes con datos simulados
- Maneja el like de forma inmutable con `useState`
- Configura el Stack Navigator (Feed ↔ Profile)
- Renderiza el `PostModal` encima de todo cuando hay un post seleccionado

No usa pantalla separada para el detalle del post — usa un Modal nativo de React Native controlado por estado (selectedPost), igual que el proyecto web anterior. Esto evita duplicar el estado del post entre dos pantallas distintas.

### `FeedScreen.tsx`
Pantalla del feed. No tiene estado propio — recibe todo por props desde App.tsx:
posts, loading, error, onLike, onOpenPost.
Usa FlatList (obligatorio por consigna) para renderizar los posts. Nunca usa .map().

### `ProfileScreen.tsx`
Pantalla de perfil. Recibe el user completo (con los posts ya cargados) por props.
Muestra la info del perfil y una grilla de fotos con FlatList numColumns={3}.

### `Header.tsx`
Barra superior fija con el logo y botones de acceso rápido.
Recibe onProfilePress para navegar al perfil. Sin estado propio.

### `PostCard.tsx`
Ítem individual del feed, renderizado por la FlatList.
Recibe post, onLike y onOpenPost por props.
Muestra: avatar, username, ubicación, imagen, barra de acciones, contador de likes y caption.

### `PostModal.tsx`
Vista de detalle del post usando el componente Modal de React Native.
Muestra la imagen en tamaño completo, comentarios simulados y permite dar like en tiempo real.
El like actualiza directamente el estado central en App.tsx (no hay estado local duplicado).

## Flujo de datos entre componentes

App.tsx  (posts, loading, error, selectedPost)
 │
 ├── FeedScreen  (posts, loading, error, onLike, onOpenPost)
 │     └── PostCard  (post, onLike, onOpenPost)
 │
 ├── ProfileScreen  (user con posts, onOpenPost)
 │     └── grilla FlatList numColumns={3}
 │
 └── PostModal  (post, onClose, onLike)  — se muestra encima de todo

## Estados (hooks)

Todos los estados viven en App.tsx:

| Estado | Tipo | Para qué sirve |
|---|---|---|
| posts | Post[] | Publicaciones cargadas desde la API |
| loading | boolean | Muestra spinner mientras carga |
| error | string o null | Mensaje si la API falla |
| selectedPost | Post o null | Post abierto en el modal (null = modal cerrado) |

useEffect con dependencias vacías [] dispara la carga una sola vez al montar la app.

## Navegación

Se usa @react-navigation/native-stack con dos rutas:

| Ruta | Pantalla | Parámetros |
|---|---|---|
| Feed | FeedScreen | Ninguno |
| Profile | ProfileScreen | Ninguno |

El detalle del post no es una ruta del Stack — es un Modal nativo controlado por selectedPost en App.tsx. La consigna permite explícitamente "Stack Navigator o pantalla modal".

## Consumo de API

GET https://api.thecatapi.com/v1/images/search?limit=12

Implementado con Axios en src/services/api.ts. Trae 12 imágenes (el mínimo pedido es 10).
Cada imagen se combina en App.tsx con usernames, ubicaciones reales de Argentina, captions y comentarios simulados para armar el objeto Post completo.

## Identidad del sistema

| Elemento | Configuración |
|---|---|
| Ícono nativo | ./assets/icon.png en app.json |
| Splash Screen | ./assets/splash.png con fondo #0e1726 |
| StatusBar | style="light" para contraste sobre fondo oscuro |
| SafeAreaView | En todas las pantallas, envuelto en SafeAreaProvider |
| Orientación | Forzada a portrait |

## Diferencias clave respecto al proyecto web (TP6)

| Aspecto | Web (TP6) | Móvil (TP8) |
|---|---|---|
| Cambio de pantalla | useState + if/else | React Navigation (Stack) |
| Listas | .map() en JSX | FlatList (virtualizada) |
| Estilos | CSS + clases | StyleSheet.create() |
| Iconos | SVG inline | @expo/vector-icons (Ionicons) |
| Grilla del perfil | CSS Grid | FlatList numColumns={3} |
| Eventos táctiles | onClick + stopPropagation | TouchableOpacity |
