const express = require("Express");
const app = express();

/*app.get("/", function(req, res){
   res.send("Hello world");
});*/

app.get("/name/:name", function(req, res){
    const name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });

app.get("/google", function(req, res){
    res.redirect("http://google.com");
});

app.get("/google/:search", function(req, res){
    const search = req.params.search;
    res.redirect("https://google.com/search?q=" + search);
});

app.get("/404", function(req, res){
    res.send("fehler, nicht gefunden");
});

app.use(express.static("gol"));

app.get("/project", function(req, res){
   res.redirect("index.html");
});

app.get("/*", function(req, res){
    res.redirect("/404");
});

app.use(express.static("gol"));

app.get("/", function(req, res){
   res.redirect("index.html");
});


app.listen(3000, function(){
   console.log("Example is running on port 3000");
});