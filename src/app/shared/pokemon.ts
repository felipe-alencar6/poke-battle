export class Pokemon {
  name!: String;
  health!: number;
  attack!: number;
  defense!: number;
  moves: Array<{ moveName: string; power: number }> = [];
  image!: String;
  types: Array<{ type1: string; type2: string }> = [];
}
