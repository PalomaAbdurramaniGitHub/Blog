import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const date = new Date();
const currentYear = date.getFullYear();
let postArray = [];
let i=0;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
    const reversedPosts = [...postArray].reverse();
    res.render("index.ejs", {year: currentYear, array: reversedPosts});
});
app.get("/create", (req, res)=>{
    res.render("create.ejs", {year: currentYear});
});
app.get("/about", (req, res)=>{
    res.render("about.ejs", {year: currentYear});
});


app.post("/post", (req, res)=>{
    const newPost = {
        id: i,
        postTitle: req.body["title"],
        postContent: req.body["content"],
    };
    i++;
    postArray.push(newPost);
    res.redirect("/");
});

app.post("/delete", (req, res)=>{
    const indexNum = parseInt(req.body["postId"]);
    const index = postArray.findIndex(post => post.id === indexNum);
    if(index !== -1){
        postArray.splice(index, 1);
    }
    res.redirect("/");
});

app.post("/edit", (req, res)=>{
    const indexNum = parseInt(req.body["postId"]);
    const index = postArray.findIndex(post => post.id === indexNum);
    if(index !== -1){
        const post = postArray[index];
        res.render("create.ejs", {postId: post.id, postTitle: post.postTitle, postContent: post.postContent, year: currentYear});
    }else{
        res.redirect("/");
    }
});

app.post("/update", (req, res)=>{
    const indexNum = parseInt(req.body["postId"]);
    const index = postArray.findIndex(post => post.id === indexNum);
    const newPost = {
        id: index,
        postTitle: req.body["title"],
        postContent: req.body["content"],
    };
    postArray[index] = newPost;
    res.redirect("/");
});

app.listen(port, (req, res)=>{
    console.log(`Listening to port ${port}.`);
});