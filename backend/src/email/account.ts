import sgMail from "@sendgrid/mail";
sgMail.setApiKey(`${process.env.SENDGRIP_KEY}`);

export const sendWelcomeEmail = (email: string, username: string) => {
  sgMail.send({
    to: email,
    from: "harry@harrys.one",
    subject: "Welcome to ezVoting App",
    html: `Greetings: ${username} \nWelcome to ezVoting App.\n<strong>Create a proposal and start voting!</strong>`,
  });
};

export const sendResultEmail = (email: string, results: any) => {
  const { option, title, link, passed } = results;

  const passedResults = passed
    ? `passed with ${option.votes} votes on ${option.title}`
    : "did not passed";

  sgMail.send({
    to: email,
    from: "harry@harrys.one",
    subject: `Results to ${title} proposal`,
    text: `The proposal ${title} ${passedResults} .\n Link: ${link}`,
  });
};
