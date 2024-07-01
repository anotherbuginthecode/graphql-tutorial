// int, float, string, boolean, ID data types

export const typeDefs = `#graphql
    type Game {
        id: ID! /* esclamation mark means field is required */
        title: String!
        platform: [String!]!
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]!
    }

    /* Query type is the entry point for all GraphQL queries */
    type Query {
        reviews: [Reviews]
        games: [Game]
        authors: [Author]
    }
`