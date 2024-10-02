const typedef_input = `
	input createUser {
		name: String!
		firstname: String!
		email: String
	}
`;

const typedef_mutation = `
	extend type Mutation {
		createUser(input: createUser!): User!
	}
`;

const resolver_mutation = {
  createUser: (_: unknown, {input}: {input: unknown}, contexts: unknown) => {
  }
};

export const typeDefs = [typedef_input, typedef_mutation];
export const resolvers = resolver_mutation;