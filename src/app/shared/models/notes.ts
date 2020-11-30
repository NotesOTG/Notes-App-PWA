import { Catergories } from './categories';

export class Notes {

    private _title: string;

    private _body: string;

    private _creationDate: string;

    private _modifiedDate: number;

    private _checklist: boolean;

    private _category: string;

    constructor (name: string, body: string, checklist: boolean = false, category: string = Catergories.NONE) {
        this.title = name;
        this.body = body;
        this._modifiedDate = Date.now() - 8.64e+7,
        this.checklist = checklist;
        this.category = category;
    }

    public get title(): string {
        return this._title;
    }
    
    public set title(value: string) {
        this._title = value;
    }

    public get body(): string {
        return this._body;
    }
    
    public set body(value: string) {
        this._body = value;
    }

    public get creationDate(): string {
        return this._creationDate;
    }
    
    public set creationDate(value: string) {
        this._creationDate = value;
    }

    public get checklist(): boolean {
        return this._checklist;
    }
    
    public set checklist(value: boolean) {
        this._checklist = value;
    }

    public get category(): string {
        return this._category;
    }

    public set category(value: string) {
        this._category = value;
    }

    public get modifiedDate(): number {
        return this._modifiedDate;
    }
    public set modifiedDate(value: number) {
        this._modifiedDate = value;
    }

}