import express, { Application, Request, Response, NextFunction } from "express"
import { engine } from "express-handlebars"
import path from "path";
import { mgClient, db } from "./db/mongo";
import * as publicRoutes from "./routes/publicRoutes";
import * as privateRoutes from "./routes/privateRoutes";
import * as dotenv from "dotenv";
import session from "express-session"
import MongoStore from "connect-mongo"
dotenv.config();

const app: Application = express();


if(process.env.NODE_ENV == "production")
{
	app.set("trust proxy", 1);
}

var MgStore = MongoStore.create({client:mgClient, dbName:"user-sessions"})

app.use(session({
	secret:"secret of the session",
	resave:false,
	saveUninitialized:false,
	cookie:{secure:process.env.NODE_ENV == "production"?true:false},
	store:MgStore
}))
app.engine('hbs', engine(
	{ extname: '.hbs', defaultLayout: undefined }
));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(publicRoutes.router);
app.use("/private",privateRoutes.router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
	console.log("server started on " + PORT);
	console.log("connecting to mongodb....")
	mgClient.connect().then(function () {

		console.log("connected to mongodb");
		console.log("database: " + db.databaseName);
	})
		.catch(err => {
			console.log("error connecting to mongodb:");
			console.error(err);
		})
})