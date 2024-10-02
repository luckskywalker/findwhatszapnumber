const typedef_type = `
type User {
    id: ID!
    name: String!
    firstname: String!
    email: String
}
`;

const resolver_type = {
  User: {

  }
};

export const typeDefs = [typedef_type];
export const resolvers = resolver_type;
