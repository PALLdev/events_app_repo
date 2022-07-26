import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../util/api-util";

const EventsPage: NextPage = ({
  allEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>Todos los Eventos NextJS-Firebase</title>
        <meta
          name="description"
          content="Encuentra una lista con todos nuestros eventos realizados y por realizar.."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allEvents = await getAllEvents();
  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
};

export default EventsPage;
