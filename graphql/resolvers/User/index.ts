import * as type from "./type";
import * as mutation from "./mutation";
import * as query from "./query";

export const typeDefs = [
  ...type.typeDefs,
  ...mutation.typeDefs,
  ...query.typeDefs
];

export const resolvers = {
  ...type.resolvers,
  Mutation: {
    ...mutation.resolvers
  },
  Query: {
    ...query.resolvers
  }
};
