export interface optionInterface {
  id: number | string;
  count: number;
  name: string;
  selected: boolean;
}

export interface proposalInterface {
  _id: number | string;
  title: string;
  options: optionInterface[];
  deadline: string;
  capacity: number;
  active: boolean;
  editOn: boolean;
  chosenProposal: [];
  totalVotes: number;
  createdBy: string;
}
