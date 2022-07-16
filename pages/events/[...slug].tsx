import type { NextPage } from "next";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import EventType from "../../util/types";
import Head from "next/head";

const FilteredResultPage: NextPage = () => {
  const [loadedEvents, setLoadedEvents] = useState<Array<EventType>>();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://evaluacion-d8820.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events: Array<EventType> = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Resultados del filtro de eventos</title>
      <meta
        name="description"
        content={`Listado de todos los eventos filtrados`}
      />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Cargando...</p>
      </>
    );
  }

  const filteredYear = filterData![0];
  const filteredMonth = filterData![1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Resultados del filtro de eventos</title>
      <meta
        name="description"
        content={`Todos los eventos para ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2022 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Filtro invalido... Reintenta tu busqueda.</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Mostrar todos los eventos</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No existen eventos para esta fecha</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Mostrar todos los eventos</Button>
        </div>
      </>
    );
  }

  const resultsDate = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={resultsDate} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData = params?.slug;

//   const filteredYear = filterData![0];
//   const filteredMonth = filterData![1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2022 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredResultPage;
