import { loadTemplate, sendEmail } from "../config/mailer";

export async function contactToUs(req, res) {
  const requireContactProperties = [
    "name",
    "surname",
    "email",
    "description",
    "topic"
  ];

  for (let i = 0; i < requireContactProperties.length; i++) {
    if (
      !req.body[requireContactProperties[i]] ||
      req.body[requireContactProperties[i]].length === 0
    ) {
      return res.status(400).send({
        msg: `Missing ${requireContactProperties[i]} property`
      });
    }
  }

  let { name, surname, email, taxNumber, description, companyName, topic } = req.body;
  if (!taxNumber) {
    taxNumber = "Brak"
  }
  if (!companyName) {
    companyName = "Brak"
  }
  loadTemplate("contactToUs", [
    { name, surname, email, taxNumber, description, companyName, topic }
  ])
    .then(result => {
      sendEmail({
        to: "marcinwarzybok@outlook.com",
        subject: `New Customer ${name} ${surname}`,
        html: result[0].email.html,
        text: result[0].email.text
      });
    })
    .catch(err => {
      console.log(err);
    });
  res.send({});
}
