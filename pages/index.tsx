import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration";
import { getFeaturedEvents } from "../util/api-util";

const StartingPage: NextPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Aplicación de Eventos NextJS-Firebase</title>
        <meta
          name="description"
          content="Encuentras variados eventos a los que acudir en tu ciudad"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default StartingPage;
