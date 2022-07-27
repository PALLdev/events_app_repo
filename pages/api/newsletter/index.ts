import { NextApiRequest, NextApiResponse } from "next";

type NewsletterPOSTResponseData = {
  message: string;
  email?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterPOSTResponseData>
) {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || userEmail.trim() === "" || !userEmail.includes("@")) {
      // status code for wrong user input
      res.status(422).json({ message: "error en el email" });
      return;
    }
    console.log(userEmail);
    // status code for resource added or saved correctly
    res
      .status(201)
      .json({ message: "agregado exitosamente", email: userEmail });
  }
}
