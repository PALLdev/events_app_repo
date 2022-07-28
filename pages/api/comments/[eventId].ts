import type { NextApiRequest, NextApiResponse } from "next";
import { CommentBodyType } from "../../../util/types";
import { MongoClient, ObjectId } from "mongodb";

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
  const eventId = req.query.eventId;

  const uri =
    "mongodb+srv://pablo:jqZvb5vhiyqNNHGk@clusterpuntosapp.cfo6t.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  if (req.method === "GET") {
    const database = client.db("events_app");
    const comments = database.collection<CommentCollection>("comments");

    const cursor = comments.find<CommentCollection>(
      { eventId: { $eq: eventId } },
      {
        sort: { _id: -1 },
        projection: { _id: 1, name: 1, text: 1 },
      }
    );
    const eventComments = await cursor.toArray();

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
      return;
    }

    const database = client.db("events_app");
    const comments = database.collection<CommentCollection>("comments");

    const newComment: CommentCollection = {
      eventId,
      email,
      name,
      text,
    };

    const result = await comments.insertOne(newComment);
    newComment._id = result.insertedId;

    res.status(201).json({
      message: "comentario agregado exitosamente",
      addedComment: newComment,
    });
  }

  client.close();
};
