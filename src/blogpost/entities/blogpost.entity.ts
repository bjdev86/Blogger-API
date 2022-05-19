/* eslint-disable prettier/prettier */
export class Blogpost 
{
   //private author: string; 

    constructor( private _author: string, private _date: Date, 
                private _body: string) {}

    get author ():string {return this._author};
    get date ():Date {return this._date};
    get body ():string {return this._body};
}
