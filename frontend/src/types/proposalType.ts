export interface optionInterface {
  votes: number;
  name: string;
}

export interface proposalInterface {
  id: string;
  title: string;
  options: optionInterface[];
  timeLeft: string;
  creator_id: string;
  max: number;
  active: boolean;
}
