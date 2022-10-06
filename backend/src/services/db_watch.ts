import Voter from "../models/VoterModel";
import Option from "../models/OptionModel";
import { sendResultEmail } from "../email/account";

export const closeProposalOnCapacity = async (proposal: any) => {
  //UPDATE TOTAL VOTE COUNT
  const count = await Voter.find({
    proposalId: proposal._id,
    optionId: { $ne: null },
  }).count();

  if (count >= proposal.capacity) {
    // MAX ITEMS
    const maxValOption: any = await Option.findOne({ proposalId: proposal._id })
      .sort({ count: -1 })
      .limit(1);

    const allMaxOptions = await Option.find({
      proposalId: proposal._id,
      count: maxValOption.count,
    });
    await proposal.updateOne({
      active: false,
      totalVotes: proposal.capacity,
      chosenProposal: allMaxOptions,
    });
    sendResultEmail(proposal._id);
  } else {
    await proposal.updateOne({ totalVotes: count, editOn: false });
  }
};
