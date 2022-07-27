import type { NextApiRequest, NextApiResponse } from "next";
import { CommentsResType, CommentType } from "../../../util/types";

type Data = {
  message: string;
  addedComment?: CommentType;
  comments?: Array<CommentsResType>;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const eventId = req.query.eventId;

  if (req.method === "GET") {
    const dummyList: Array<CommentsResType> = [
      { id: "comentario1", name: "Juan", text: "Anda a acostarte hombre!" },
      { id: "comentario2", name: "Pedro", text: "Este es el comentario 2!" },
      { id: "comentario3", name: "Tulio", text: "Juanito queso fresco!" },
      { id: "comentario4", name: "Andres", text: "Tulio animal!" },
    ];
    console.log("SOY UN GET REQUEST");
    res
      .status(200)
      .json({ message: "mostrando todos coments", comments: dummyList });
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body as CommentType;

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

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({
      message: "comentario agregado exitosamente",
      addedComment: newComment,
    });
  }
};
