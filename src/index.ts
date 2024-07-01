import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";

// server setup

const APOLLO_PORT = 4000
const server = new ApolloServer({
    // typeDefs --  definition of types of data
    typeDefs,
    // resolvers -- functions that return data for the schema
})

const { url } = await startStandaloneServer(server, {
    listen: {port: APOLLO_PORT}
})

console.log(`Server ready at port ${APOLLO_PORT}`)


export default {}