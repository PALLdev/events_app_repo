import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectToDatabase, insertDocument } from "../../../util/helpers";

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
    let client: MongoClient;

    if (!userEmail || userEmail.trim() === "" || !userEmail.includes("@")) {
      // status code for wrong user input
      res.status(422).json({ message: "error en el email" });
      return;
    }

    try {
      client = await connectToDatabase();
    } catch (error) {
      // status code that something went wrong on the server
      res.status(500).json({
        message: "Se produjo un fallo al conectar con la DB",
      });
      return;
    }

    try {
      await insertDocument<NewsletterEmailCollection>(client, "newsletter", {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Se produjo un fallo al insertar los datos a la DB",
      });
      return;
    }

    // status code for resource added or saved correctly
    res.status(201).json({ message: "agregado exitosamente" });
  }
}
