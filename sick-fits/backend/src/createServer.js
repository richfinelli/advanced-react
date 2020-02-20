//this file is used by index.js to run the server, 
//this file CREATES teh GraphQL Server
//it pulls in GraphQL Yogo package, then it pulls in our 3 files:
////Mutation.js
////Query.js
////db.js - this file connects to the remote PRISMA DB and gives us the ability to query it with JS
const { GraphQLServer } = require('graphql-yoga'); 
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

function createServer() {
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation, //es6 Mutation: Mutation
            Query, //es6 Query: Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => ({ ...req, db })
    })
}

module.exports = createServer;  