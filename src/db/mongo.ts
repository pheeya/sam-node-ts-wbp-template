import { MongoClient, Db , Collection} from "mongodb"
import * as dotenv from "dotenv";
dotenv.config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASS

const DB_NAME = "test-db"


const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.acnps.mongodb.net/?retryWrites=true&w=majority`

export const mgClient: MongoClient = new MongoClient(MONGO_URI);
export const db: Db = mgClient.db(DB_NAME);
export const COL_FREELANCE_PROJECTS: Collection = db.collection("freelance-projects");
export const COL_USERS: Collection = db.collection("users");