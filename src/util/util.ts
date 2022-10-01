import { IView } from "../data/view"

export const GetActiveView = function (_views: IView[], _currentURL: string): IView {
    var view: IView= {name:"", title:"", path:"", template:"", scripts:[], entry:[]};
    
    for (var i = 0; i < _views.length; i++) {
        if (_views[i].path == _currentURL) {
           view = _views[i];
           break;
        }
    }

    return view;
}

