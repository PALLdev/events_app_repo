import {
  MongoClient,
  OptionalUnlessRequiredId,
  Filter,
  Sort,
  Document,
} from "mongodb";

export const connectToDatabase = async () => {
  const uri =
    "mongodb+srv://pablo:jqZvb5vhiyqNNHGk@clusterpuntosapp.cfo6t.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);

  return client;
};

export const insertDocument = async <T>(
  client: MongoClient,
  collection: string,
  document: OptionalUnlessRequiredId<T>
) => {
  const database = client.db("events_app");

  const collectionNodeRef = database.collection<T>(collection);
  const result = await collectionNodeRef.insertOne(document);

  return result;
};

export const getDocumentsForFilter = async <T>(
  client: MongoClient,
  collection: string,
  filter: Filter<T>,
  sort: Sort,
  projection: Document
) => {
  const database = client.db("events_app");
  const collectionNodeRef = database.collection<T>(collection);

  const documentList = await collectionNodeRef
    .find<T>(filter, {
      sort,
      projection,
    })
    .toArray();

  return documentList;
};
