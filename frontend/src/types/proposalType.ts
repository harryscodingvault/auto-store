export interface optionInterface {
  id: number | string;
  votes: number;
  name: string;
  selected: boolean;
}

export interface proposalInterface {
  id: number | string;
  title: string;
  options: optionInterface[];
  timeLeft: string;
  creator_id: string;
  max: number;
  active: boolean;
  winner: string;
  voted: boolean;
}
