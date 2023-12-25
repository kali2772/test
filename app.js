const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");
// yzz2TLdLWn85iQE

mongoose.connect(
  MONGOURI /* ,{
    useNewUrlParser:true,
    useUnifiedTopology: true
} */
);

mongoose.connection.on("connected", () => console.log("ohhh yehhh"));
mongoose.connection.on("error", (err) => console.log("err connecting", err));

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

require("dotenv").config();
const path = require("path");
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/server/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, "server", "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

app.listen(PORT, () => console.log("server is running on", PORT));
/* // bottom code (middleware) is likly to use authenticate your app
    const custommiddleware = (req,res,next)=>{
        console.log("middle finger is here")
        next()
    }
    
    // app.use(custommiddleware)        this for all route
    
    app.get('/',(req,res)=>{
        res.send("hello")
    })
    app.get('/about',custommiddleware,(req,res)=>{
        res.send("about")
    })
    app.get('/portfolio',(req,res)=>{
        res.send("portfolio")
    }) */
