const express=require("express");
const app=express();
const path=require("path");
const cors= require("cors");
const bodyParser=require("body-parser");
const Chatkit=require("@pusher/chatkit-server");

const chatkit=new Chatkit.default({
    instanceLocator:"v1:us1:18cb772d-90d4-4398-99af-e14a882d4e51",
    key:"264e9d9d-b982-4e52-aee4-13350d64968e:kM5fcbQjdP2a5Zm4W6TUa+cFQOZgUMjVo1wZJFu12Ms="
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname,"client/build")));

app.post("/users",(req,res)=>{
    //console.log(req.body)
    const {username}=req.body;
    //console.log(username)
    chatkit.createUser({
        name:username,
        id:username
    }).then(()=>res.sendStatus(201)).catch(err=>{
        //console.log(err.error)
        if(err.error==="services/chatkit/user_already_exists"){
            res.sendStatus(200)
        }else{
            //console.log(err)
            res.status(err.statusCode).json(err)
        }
    })
});

app.post("/authenticate",(req,res)=>{
    //console.log(req.body)
    const {grant_type}=req.body;
    console.log(typeof req.query.user_id);
    console.log(typeof grant_type);
    console.log({grant_type,userId:req.query.user_id});
    //sys.puts(sys.inspect(someVariable));
    //console.log(res.json(chatkit.authenticate({grant_type,userId:req.query.user_id})))
    res.json(chatkit.authenticate({grant_type,userId:req.query.user_id}));
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html"))
});

app.listen((process.env.PORT || 8081), (req,res)=>{
    console.log(`listening at ${(process.env.PORT || 8081)}`);
})