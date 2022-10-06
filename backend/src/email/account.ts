import sgMail from "@sendgrid/mail";
import Voter from "../models/VoterModel";
import Proposal from "../models/ProposalModel";
import Option from "../models/OptionModel";

sgMail.setApiKey(`${process.env.SENDGRIP_KEY}`);

export const sendWelcomeEmail = (email: string, username: string) => {
  sgMail.send({
    to: email,
    from: "harry@harrys.one",
    subject: "Welcome to ezVoting App",
    html: `Greetings: ${username} \nWelcome to ezVoting App.\n<strong>Create a proposal and start voting!</strong>`,
  });
};

export const sendResultEmail = async (_id: any) => {
  const winners = await Voter.find(
    { proposalId: _id },
    { voterId: 1 }
  ).populate("voterId", "email");

  const proposal: any = await Proposal.findOne({ _id }, { chosenProposal: 1 });
  const optionsSelected = await Option.find(
    {
      _id: { $in: proposal.chosenProposal },
    },
    { name: 1, count: 1 }
  );

  const emails = winners.map((voter: any) => {
    return voter.voterId.email;
  });

  const msg: any = {
    to: emails,
    from: "harry@harrys.one",
    subject: `Results to ${proposal.title} proposal`,
    text: `The proposal ${proposal.title} passed with ${
      optionsSelected[0].count
    } votes on  ${
      optionsSelected.length > 1
        ? optionsSelected.map((item) => item.name).join(", ")
        : optionsSelected[0].name
    } .\n Link:`,
  };

  sgMail
    .sendMultiple(msg)
    .then(() => {
      console.log("emails sent successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};
