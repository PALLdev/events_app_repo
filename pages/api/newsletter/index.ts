import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type NewsletterPOSTResponseData = {
  message: string;
};

type NewsletterEmailCollection = {
  email: string;
};

export default async function handler(
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

    const uri =
      "mongodb+srv://pablo:jqZvb5vhiyqNNHGk@clusterpuntosapp.cfo6t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    const database = client.db("events_app");

    const newsletterEmails =
      database.collection<NewsletterEmailCollection>("newsletter");

    await newsletterEmails.insertOne({ email: userEmail });

    client.close();

    // status code for resource added or saved correctly
    res.status(201).json({ message: "agregado exitosamente" });
  }
}
