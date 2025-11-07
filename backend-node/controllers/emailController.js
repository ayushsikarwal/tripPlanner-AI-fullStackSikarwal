import nodemailer from "nodemailer";

export const sendInvitationEmails = async (req, res) => {
  const { invitedMembers, formData, tripId } = req.body;

  if (!invitedMembers || !Array.isArray(invitedMembers)) {
    return res.status(400).send("Invalid invitedMembers parameter");
  }

  invitedMembers.forEach((member) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: member,
      subject: `Invitation to join the trip using TBO`,
      html: `Hello i'm inviting you to join the trip to ${formData.location.label} for ${formData.noOfDays} days. Below is the link to join the trip: <a href="http://localhost:5173/chat-room/${tripId}" target="_blank">Link</a>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
      }
    });
  });

  return res.send("Emails sent");
};


