
export interface CatImage {
  id: string;   
  url: string;  
}

export interface Post {
  id: string;
  imageUrl: string;
  username: string;
  location: string;     // NUEVO respecto al proyecto web: la consigna pide ubicación simulada
  likes: number;
  liked: boolean;
  caption: string;      // en la consigna lo llaman "caption" en vez de "description"
  date: string;
  comments: Comment[];
}

// Cada comentario tiene quién lo escribió y el texto
export interface Comment {
  username: string;
  text: string;
}