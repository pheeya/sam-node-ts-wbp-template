import { List } from "src/util/List";
import { COL_USERS } from "src/db/mongo";
import * as bcrypt from "bcrypt"
import { ObjectId } from "mongodb";
const saltRounds = 10;

export interface IUser {
   _id: ObjectId,
   name: string;
   email: string;
   accessLevel: number;
}
interface IUserHash extends IUser {
   hash: string;
}
export class User {
   private m_id: ObjectId;
   private m_name: string
   private m_email: string;
   private m_accessLevel: number;
   public constructor(_name: string, _email: string, _accessLevel: number = 0) {
      this.m_name = _name;
      this.m_email = _email;
      this.m_id = new ObjectId();
      this.m_accessLevel = _accessLevel;
   }




   public GetDbDoc(): IUser {
      return {
         _id: this.m_id,
         name: this.m_name,
         email: this.m_email,
         accessLevel: this.m_accessLevel
      }
   };


   public GetAccessLevel() { return this.m_accessLevel; }
   public async SaveNew(pass: string): Promise<any> {
      var user: IUser = this.GetDbDoc();
      var dbU: IUserHash = { _id: user._id, name: user.name, email: user.email, accessLevel: user.accessLevel, hash: "" };
      try {

         const hash = await bcrypt.hash(pass, saltRounds);
         dbU.hash = hash;
         await COL_USERS.insertOne(dbU);
         return user;
      }
      catch (error) {
         return error;
      }
   }

   public static CreateFromDbDoc(_doc: IUser): User {
      var u: User = new User(_doc.name, _doc.email, _doc.accessLevel);
      return u;
   }

   public static async FindById(_id: string): Promise<any> {
      var id: ObjectId = new ObjectId(_id);

      const query = {
         _id: id,
         projection: { hash: 0 }
      }
      const doc: IUser = await COL_USERS.findOne(query) as any as IUser;
      const user: User = User.CreateFromDbDoc(doc);
      return user;
   }
   public static async FindByEmail(_email: string): Promise<any> {

      const query = {
         email: _email
      }
      const options = {

      }
      try {
         const doc: IUserHash = await COL_USERS.findOne(query, options) as any as IUserHash;
         return doc;
      }
      catch (error) {
         throw error;
      }
   }
   public static async AttemptLogin(_data: { email: string, password: string }): Promise<any> {
      try {
         var doc: IUserHash = await this.FindByEmail(_data.email);
         const match = await bcrypt.compare(_data.password, doc.hash);
         if (match) {

            const user :IUser = {
               _id:doc._id,
               name:doc.name,
               email:doc.email,
               accessLevel:doc.accessLevel,
            };
            return { success: true, user: user };
         }
         else {
            return { success: false, user: null }
         }
      }
      catch (error) {
         throw error;
      }
   }

}  