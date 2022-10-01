import { List } from "src/util/List";
import { COL_FREELANCE_PROJECTS } from "src/db/mongo";

interface IProject {
    name: string;
    friendlyName: string;
    thumbnailPath: string;
    url: string;
    sdescription: string;
    fdescription: string[];
    role: string;
    techStack: string[];
}



export class Project {
    private m_name: string;
    private m_friendlyName: string;
    private m_thumbnailPath: string;
    private m_url: string;
    private m_shortDescription: string;
    private m_fullDescription: List<string>;
    private m_role: string;
    private m_techStack: List<string>



    public constructor(_name: string, _friendlyName: string, _thumbnailPath: string, _url: string, _sdescription: string, _fdescription: List<string>, _role: string, _techStack: List<string>) {
        this.m_name = _name;
        this.m_friendlyName = _friendlyName;
        this.m_thumbnailPath = _thumbnailPath;
        this.m_url = _url;
        this.m_shortDescription = _sdescription;
        this.m_fullDescription = _fdescription;
        this.m_role = _role;
        this.m_techStack = _techStack;
    }


    public GetDbDoc(): IProject {
        var doc: IProject = {
            name: this.m_name,
            friendlyName: this.m_friendlyName,
            thumbnailPath: this.m_thumbnailPath,
            url: this.m_url,
            sdescription: this.m_shortDescription,
            fdescription: this.m_fullDescription.GetRaw(),
            role: this.m_role,
            techStack: this.m_techStack.GetRaw()
        }

        return doc;
    }

    public Save() {
       return COL_FREELANCE_PROJECTS.insertOne(this.GetDbDoc());
    }


    public static async GetAll(limit: number): Promise<any> {
        try {
            var docs: IProject[];
            docs = (await COL_FREELANCE_PROJECTS.find({}).toArray()) as any as IProject[];
            var projects:Project[] = this.CreateMultipleFromDbDoc(docs);
            return  projects;
        }
        catch (error) {
            throw error;
        }
    }

    public static CreateFromDbDoc(_doc: IProject): Project {
        var fd: List<string> = new List<string>();
        fd.AddRange(_doc.fdescription);

        var ts: List<string> = new List<string>();
        ts.AddRange(_doc.techStack);

        return new Project(_doc.name, _doc.friendlyName, _doc.thumbnailPath, _doc.url, _doc.sdescription, fd, _doc.role, ts);
    }
    public static CreateMultipleFromDbDoc(_doc: IProject[]): Project[] {
        var projects: Project[] = [];
        for (var i = 0; i < _doc.length; i++) {
            projects.push(this.CreateFromDbDoc(_doc[i]));
        }

        return projects;
    }

}

