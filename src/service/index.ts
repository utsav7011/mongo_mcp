import { getAllDataFromMongoDb } from "./getAllDataFromMongoDb";
import { getCollectionSchema } from "./getCollectionSchema";
import { findOneDoc } from "./findOneDoc";
import { findManyDoc } from "./findManyDocs";
import { updateOneDoc } from "./updateOneDoc";
import { updateManyDoc } from "./updateManyDocs";
import { deleteOneDoc } from "./deleteOneDoc";
import { deleteManyDocs } from "./deleteManyDocs";
import { countDocs } from "./countDocs";
import { createnewIndexIndexInCollection } from "./createNewIndex";
import { getIndexesInACollection } from "./getIndexes";
// import { insertANewDocumentToMongoDb } from "./insertNewDocumentToMongodb";

export {
  getAllDataFromMongoDb,
  getCollectionSchema,
  findOneDoc,
  findManyDoc,
  updateOneDoc,
  updateManyDoc,
  deleteOneDoc,
  deleteManyDocs,
  countDocs,
  createnewIndexIndexInCollection,
  getIndexesInACollection,
};
