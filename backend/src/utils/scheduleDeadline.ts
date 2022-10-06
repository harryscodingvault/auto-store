import schedule from "node-schedule";
import { sendResultEmail } from "../email/account";
import Proposal from "../models/ProposalModel";

export const scheduleProposalClosing = (_id: any, date: Date) => {
  schedule.scheduleJob(date, async () => {
    const proposal: any = await Proposal.find({ _id });
    if (proposal.active) {
      await proposal.updateOne({ active: false });
      sendResultEmail(_id);
    }
  });
};
