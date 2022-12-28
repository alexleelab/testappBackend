import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
router.get("/cards", async(req,res)=>{
    console.log("query",req.query)
    const {type,queryString}=req.query
    try{
        const query={}
        query[type]=queryString
        const queryCard=await ScoreCard.find(query)
        console.log(queryCard)
        if(queryCard.length){
            var templist=[]
            queryCard.forEach(ele => {
                templist.push(`Found card with ${type} (${queryString}) (${ele.name}, ${ele.subject}, ${ele.score})`)
            });
            res.json({
                message:'ok',
                messages:templist
            })
        }
        else{
            res.json({message:'nothing',messages:[`${type} (${queryString}) not found`]})
        }
    }catch(err){throw new Error(err)}
});
router.post("/card", async (req,res)=>{
    console.log("post",req.body)
    const {name,subject,score}=req.body
    try{
        const ifExist=await ScoreCard.findOne({name,subject})
        console.log(ifExist)
        if(ifExist){
            await ScoreCard.updateMany({name,subject},{score})
            res.json({
                message:`Update (${name}, ${subject}, ${score})`,
                card:{name,subject,score}
            })
        }
        else{
            const newScoreBoard=new ScoreCard({name,subject,score})
            await newScoreBoard.save()
            res.json({
                message:`Add (${name}, ${subject}, ${score})`,
                card:{name,subject,score}
            })
        }
    }catch(err){throw new Error(err)}
});
router.delete("/cards",async(req,res)=>{
    try{
        await ScoreCard.deleteMany({})
        res.json({message:"Database cleared"})
    }catch(err){throw new Error(err)}
})
//router.get("/cards", ...);
export default router;