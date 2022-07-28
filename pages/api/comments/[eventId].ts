import type { NextApiRequest, NextApiResponse } from "next";
import { CommentBodyType } from "../../../util/types";
import { MongoClient, ObjectId } from "mongodb";
import {
  connectToDatabase,
  getDocumentsForFilter,
  insertDocument,
} from "../../../util/helpers";

type CommentCollection = {
  _id?: ObjectId;
  eventId?: string | string[];
  email?: string;
  name: string;
  text: string;
};

type Data = {
  message: string;
  addedComment?: CommentCollection;
  comments?: Array<CommentCollection>;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let client: MongoClient;

  const eventId = req.query.eventId;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({
      message: "Se produjo un fallo al conectar con la DB",
    });
    return;
  }

  if (req.method === "GET") {
    try {
      const eventComments = await getDocumentsForFilter<CommentCollection>(
        client,
        "comments",
        { eventId: { $eq: eventId } },
        { _id: -1 },
        { _id: 1, name: 1, text: 1 }
      );

      const mappedComments = eventComments.map((eventComment) => {
        return {
          id: eventComment._id?.toJSON(),
          text: eventComment.text,
          name: eventComment.name,
        };
      });

      res
        .status(200)
        .json({ message: "mostrando todos coments", comments: mappedComments });
    } catch (error) {
      res.status(500).json({
        message: "Se produjo un fallo al traer los datos de la DB",
      });
    }
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body as CommentBodyType;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Formulario invalido" });
      client.close();
      return;
    }

    const newComment: CommentCollection = {
      eventId,
      email,
      name,
      text,
    };

    try {
      const result = await insertDocument<CommentCollection>(
        client,
        "comments",
        newComment
      );
      newComment._id = result.insertedId;

      res.status(201).json({
        message: "comentario agregado exitosamente",
        addedComment: newComment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Se produjo un fallo al insertar el comentario en la DB",
      });
    }
  }

  client.close();
};
