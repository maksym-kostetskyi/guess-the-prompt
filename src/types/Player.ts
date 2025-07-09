export default interface Player {
  id: number;
  username: string;
  total_games: number;
  total_score: number;
  avatar_url: string;
  role: "admin" | "player";
  score: number;
  name?: string; // Додано для відображення імені гравця
}
