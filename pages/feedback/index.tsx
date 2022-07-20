import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Feedback from "../../components/feedback/Feedback";
import { buildPathToFile, extractFeedbackData } from "../../util/api-util";

const EventsPage: NextPage = ({
  feedbackItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Feedback NextJS-Firebase </title>
        <meta
          name="description"
          content="Envianos feedback para mejorar nuestra pagina.."
        />
      </Head>
      <Feedback feedbackList={feedbackItems} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = buildPathToFile();

  const data = extractFeedbackData(filePath);

  return { props: { feedbackItems: data } };
};

export default EventsPage;
