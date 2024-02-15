import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    //Create Graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String
            }
        `,
        resolvers:{
            Query:{
                hello:()=> `hi there i am nagar`
            }
        },
    });
    //Start gql server
    await gqlServer.start();

    app.get("/",(req,res)=>{
        res.json({message:"server is up and rinning"});
    })
    app.use("/graphql",expressMiddleware(gqlServer));
    app.listen(PORT,()=>console.log(`Server started at port:${PORT}`));
}
init();