import connectToDB from "./connectToDB";
import getDatabase from "./getDatabase";
import models from "./models";

const database = {
  connectToDB,
  models,
  getDatabase
};

export {default as connectToDB} from "./connectToDB";
export {default as models} from "./models";
export {default as getDatabase} from "./getDatabase";

export default database;
