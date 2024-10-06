export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Card {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'text' | 'link';
  imageUrl?: string;
}