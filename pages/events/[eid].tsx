import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import EventContent from "../../components/event-detail/EventContent";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventSummary from "../../components/event-detail/EventSummary";
import { getEventById, getFeaturedEvents } from "../../util/api-util";

const EventDetailPage: NextPage = ({
  selectedEvent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title} </title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        address={selectedEvent.location}
        date={selectedEvent.date}
        image={selectedEvent.image}
        imageAlt={`Foto de ${selectedEvent.title}`}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.eid;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eid: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default EventDetailPage;
