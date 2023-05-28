import { Room } from "./Room";
import { User } from "./User";

export interface Store {
  user: User[];
  room: Room[];
}
