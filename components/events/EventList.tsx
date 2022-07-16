import EventType from "../../util/types";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";

type EventListProps = {
  items: EventType[];
};

const EventList = ({ items }: EventListProps) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          image={event.image}
          date={event.date}
          location={event.location}
          id={event.id}
        />
      ))}
    </ul>
  );
};

export default EventList;
