export class Pokemon {
  name!: string;
  health!: number;
  attack!: number;
  defense!: number;
  moves: Array<{ moveName: string; power: number }> = [];
  image!: string;
  types: Array<{ type1: string; type2: string }> = [];
}
