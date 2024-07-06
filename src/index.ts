import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        reviews: () => db.reviews,
        games: () => db.games,
        authors: () => db.authors,
        review: (_, { id }) => db.reviews.find(review => review.id === id),
        game: (_, { id }) => db.games.find(game => game.id === id),
        author: (_, { id }) => db.authors.find(author => author.id === id),
    },
    // parent is the object that contains the field being resolved
    // in this case, parent is the game object that contains the reviews field
    Game: {
        reviews: (parent) => db.reviews.filter(review => review.game_id === parent.id),
    },
    Author: {
        reviews: (parent) => db.reviews.filter(review => review.author_id === parent.id),
    },
    Review: {
        // find because there is only one author per review
        author: (parent) => db.authors.find(author => author.id === parent.author_id),
        game: (parent) => db.games.find(game => game.id === parent.game_id)
    },
    Mutation: {
        deleteGame: (_, { id }) => {
            db.games = db.games.filter(game => game.id !== id);
            return db.games;
        },
        addGame: (_, { game }) => {
            const newGame = {
                id: Math.floor(Math.random() * 1000).toString(),
                ...game
            }
            db.games.push(newGame);
            return newGame;
        },
        updateGame: (_, { id, edits }) => {
            db.games = db.games.map(game => {
                if (game.id === id) {
                    return {
                        ...game,
                        ...edits
                    }
                }
                return game;
            })

            return db.games.find(game => game.id === id); // because the return type is Game
        }
    }
}

// server setup
const APOLLO_PORT = 4000
// typeDefs --  definition of types of data
// resolvers -- functions that return data for the schema
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: {port: APOLLO_PORT}
})

console.log(`Server ready at port ${APOLLO_PORT}`)


export default {}