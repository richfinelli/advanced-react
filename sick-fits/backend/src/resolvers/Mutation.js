//Here are the Mutations
//Mutations create, edit, delete data (i think) vs a query that just reads adn gets data
//this file is imported in to createServer.js 
//IMPORTANT: What's in this file, must also be in schema.graphql or else the backend server (npm run dev) will start crying

//considered a "RESOLVER"

//STEP 3.2

const Mutations = {
    async createItem(parent, args, ctx, info) {
        //TODO: check if user is logged in

        const item = await ctx.db.mutation.createItem({
            data: {
                ...args 
                //what is going on with "...args"?
                //first, args is an object that contains the name, title, description, price, etc. as args.name, args.title, etc.
                //es6 magic spreads the args object into the data object (...args)
                //i.e args.name, args.title, args.description, etc.
                //which becomes { name: args.name, title: args.title, etc. }
            }

        }, info);
        return item;
    },
    async createPlayer(parent, args, ctx, info) {
        //TODO: check if user is logged in

        const player = await ctx.db.mutation.createPlayer({
            data: {
                ...args 
                //what is going on with "...args"?
                //first, args is an object that contains the name, title, description, price, etc. as args.name, args.title, etc.
                //es6 magic spreads the args object into the data object (...args)
                //i.e args.name, args.title, args.description, etc.
                //which becomes { name: args.name, title: args.title, etc. }
            }

        }, info);
        return player;
    },
    async updateItem(parent, args, ctx, info) {
        //first take a copy of the updates
        const updates = { 
            id: args.id,
            title: args.title,
            description: args.description,
            price: args.price
            //Or, i could have just used ...args here.

         };
        //second, remove the id from the updates
        delete updates.id;
        //finally, call the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        const item = await ctx.db.query.item({where}, `{id title}`);
        return ctx.db.mutation.deleteItem({where}, info);
    }
};

module.exports = Mutations;
