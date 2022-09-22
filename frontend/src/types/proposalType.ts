export type proposalType = {
  id: string;
  title: string;
  nVotesYay: number;
  nVotesNay: number;
  nVotesNeutral: number;
  capacity: number;
  passing_vote_req: number;

  creator_id: string;
  passed: boolean;
  active: boolean;
};

export interface ProposalInterface {
  data: proposalType;
}
