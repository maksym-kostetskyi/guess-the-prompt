import type Player from "./Player";

export default interface Room {
  room_id: string;
  players: Player[];
  state: string;
  current_turn: number;
  prompt: string;
  image_url: string;
}