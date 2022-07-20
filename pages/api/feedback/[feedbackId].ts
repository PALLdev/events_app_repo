import { NextApiRequest, NextApiResponse } from "next";
import { buildPathToFile, extractFeedbackData } from "../../../util/api-util";
import { FeedbackType } from "../../../util/types";

type ResponseData = {
  feedback: FeedbackType | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildPathToFile();
  const allFeedbacks = extractFeedbackData(filePath);

  const selectedFeedback = allFeedbacks.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}
