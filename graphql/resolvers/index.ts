
import * as User from "./User";

type schema = {
    typeDefs: string[]
    resolvers: Record<string, any>
}


const createSchema = (schemas: schema[]) => {
  const query = `
		type Query
	`;

  const mutation = `
		type Mutation
	`;

  return schemas.reduce((schema: schema, {typeDefs, resolvers}: schema) => ({
    typeDefs: [
      ...schema.typeDefs,
      ...typeDefs
    ],
    resolvers: {
      ...schema.resolvers,
      ...resolvers,
      Mutation: {
        ...schema.resolvers.Mutation,
        ...resolvers.Mutation
      },
      Query: {
        ...schema.resolvers.Query,
        ...resolvers.Query
      }
    }
  }), {
    typeDefs: [query, mutation],
    resolvers: {Mutation: {}, Query: {}}
  });
};

const schema = createSchema([
  User
]);

export const typeDefs = schema.typeDefs;
export const resolvers = schema.resolvers;

export default schema;