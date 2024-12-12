import express from 'express';
import cors from 'cors';
import {GoogleGenerativeAI}  from "@google/generative-ai";
import 'dotenv/config' 



const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy',"default-src 'self'  http://localhost:3000/ ");
    next();
});


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const abc =async()=>{
    const prompt = "write a program to print even numbers from 1 to 100 in python without explanation";
    const result = await model.generateContent([prompt]);
    console.log(result.response.text());
    
};


app.get("/",(req,res)=>{
    console.log("iam in get");
    
    res.send("iam here to help you");
});
app.get("/ok",(req,res)=>{
    res.send('iam ok at end point')
});

app.post("/convert", async (req,res)=>{
    const {code , fromLang , toLang} = req.body;
    if (!code || !fromLang || !toLang){
        return res.status(400).send('error while fetching');
    }
    try{
        const prompt = `convert the following code from ${fromLang} to ${toLang} \n ${code} \n without explanation `;
        const result = await model.generateContent([prompt]);
        const convertedCode = result.response.text();
        res.json({convertedCode});
    }
    catch(error){
        console.error("error with open api",error);
    }
});

app.listen(port, ()=>{
    console.log(" iam running in 3000");
 });