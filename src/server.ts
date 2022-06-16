import express, {Application,Request,Response, NextFunction} from "express"
import {engine} from "express-handlebars"
import path from "path";
import * as publicRoutes from "./routes/publicRoutes"; 


const app:Application = express();
 

app.engine('hbs', engine(
	{ extname: '.hbs', defaultLayout: undefined }
));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
 
app.use(publicRoutes.router);
     
    
 
app.listen(3000, function(){
console.log("server started on 3000");
})