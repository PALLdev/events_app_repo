// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FeedbackType } from "../../../util/types";
import {
  buildPathToFile,
  extractFeedbackData,
  saveToFile,
} from "../../../util/api-util";

type ResponseData = {
  message: string;
  feedback: FeedbackType | Array<FeedbackType> | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    // body viene con los datos del feedback form
    const { email, feedbackText } = req.body;

    const newFeedback: FeedbackType = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // guardarlo en una db or file
    const filePath = buildPathToFile();
    const data = extractFeedbackData(filePath);
    data.push(newFeedback);
    saveToFile(filePath, data);
    // success code porque agregue exitosamente
    res
      .status(201)
      .json({ message: "AGREGADO EXITOSAMENTE!", feedback: newFeedback });
  } else if (req.method === "GET") {
    const filePath = buildPathToFile();
    const data = extractFeedbackData(filePath);
    res.status(201).json({ message: "LISTADO DE FEEDBACKS", feedback: data });
  } else {
    res.status(200).json({ message: "NO AGREGADO!", feedback: null });
  }
}
