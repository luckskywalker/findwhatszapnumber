const input_typedef = `
input searchUser {
	id: [ID]
}
`;

const query_typedef = `
extend type Query {
	readUser: User!
	searchUser(input: searchUser!): [User]
}
`;

const resolver_query = {
  readUser: (_: unknown, __: unknown, contexts: unknown) => ({

  }),
  searchUser: (_: unknown, {input}: {input: unknown}, contexts: unknown) => ({

  })
};

export const typeDefs = [input_typedef, query_typedef];
export const resolvers = resolver_query;