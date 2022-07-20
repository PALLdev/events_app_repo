import path from "path";
import fs from "fs";
import { FeedbackType, EventType } from "./types";

export const getAllEvents = async () => {
  const response = await fetch(
    "https://evaluacion-d8820.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events: EventType[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string | string[] | undefined) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

type DateFilter = {
  year: number;
  month: number;
};

export const getFilteredEvents = async (dateFilter: DateFilter) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const buildPathToFile = () => {
  const builtPath = path.join(process.cwd(), "data", "feedback.json");
  return builtPath;
};

export const extractFeedbackData = (filePath: string) => {
  const fileData = fs.readFileSync(filePath);
  const data: Array<FeedbackType> = JSON.parse(fileData.toString());
  return data;
};

export const saveToFile = (
  filePath: string,
  feedbackList: Array<FeedbackType>
) => {
  fs.writeFileSync(filePath, JSON.stringify(feedbackList));
};
