import connectToDB from "./connectToDB";
import models from "./models";

const getDatabase = async () => {
  await connectToDB();

  return models;

};

export default getDatabase;