export interface IView {
name: string;
title: string; 
path:string
template:string; 
scripts: string[];
entry:string[]; // not sure why this is array, try making it a string
}

