export type EventType = {
  title: string;
  image: string;
  date: string;
  location: string;
  id: string;
  isFeatured?: boolean;
};

export type FeedbackType = {
  id: string;
  email: string;
  text: string;
};
