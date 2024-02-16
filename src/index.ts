import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from '@apollo/server/express4';
import UserService from "./services/user";


async function init() {
    
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json()); 
    

    app.get("/",(req,res)=>{
        res.json({message:"server is up and rinning"});
    })
    
    app.use("/graphql",expressMiddleware(await createApolloGraphqlServer(),{
        context:async({req})=>{
            const token = req.headers.authorization
            //console.log(token);
            try{
                const user = UserService.decodeJWTToken(token as string);
                return { user };
            }catch(err){
                return {};
            }
        }
    }));
    app.listen(PORT,()=>console.log(`Server started at port:${PORT}`));
}
init();