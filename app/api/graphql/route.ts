import {startServerAndCreateNextHandler} from "@as-integrations/next";
import {server} from "@/graphql/apollo/server";

import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {NextApiRequest, NextApiResponse} from "next";

const apolloNextHandler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({req, res}),
});

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (session?.user) return apolloNextHandler(request, response);
  
  return new Response("Session not found", {
    status: 403
  });
}

export {handler as GET, handler as POST};