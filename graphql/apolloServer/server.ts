import {ApolloServer} from "@apollo/server";
import {typeDefs, resolvers} from "../resolvers";


export const server = new ApolloServer({
  typeDefs,
  resolvers
});