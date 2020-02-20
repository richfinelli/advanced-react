//Here are the Queries
//Queries just reads and gets data vs Mutations that do the create, update, delete stuff
//this file is imported in to createServer.js 
//IMPORTANT: What's in this file, must also be in schema.graphql or else the backend server (npm run dev) will start crying

//considered a "RESOLVER"

//STEP 3.1

const { forwardTo } = require('prisma-binding');
const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    players: forwardTo('db')
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
    // dogs: function(parent, args, ctx, info) {
    //    global.dogs = global.dogs || [];
    //    return global.dogs;
    // }
};

module.exports = Query;
