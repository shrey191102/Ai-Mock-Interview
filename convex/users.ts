import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        imageUrl:v.string(),
    },
    handler:async(ctx,args)=>{
        // if user already exist
        const user=await ctx.db.query('UserTable')
        .filter((q)=>q.eq(q.field('email'),args.email)).collect();

        // if not then insert into db
        if(user.length===0)
        {
            const data={
                name:args.name,
                email:args.email,
                imageUrl:args?.imageUrl,
            }
        const result=await ctx.db.insert('UserTable',{
            ...data
        });
        return {
            ...data,
            result
            //_id:result
        }
    }
    return user[0];
    }
})
