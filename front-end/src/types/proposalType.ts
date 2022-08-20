export type proposalType = {
  id: string;
  name: string;
  nVotesYay: number;
  nVotesNay: number;
  nVotesNeutral: number;
  capacity: number;
  passing_vote_req: number;
  passing_part_req: number;
  creator_id: string;
  passed: boolean;
};

export interface ProposalInterface {
  data: proposalType;
}
