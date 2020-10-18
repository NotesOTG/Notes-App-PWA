import { Catergories } from './categories';

export class Notes {

    private _name: string;

    private _body: string;

    private _date: Date;

    private _checklist: boolean;

    private _category: Catergories;

    constructor (name: string, body: string, date: Date, checklist: boolean = false, category: Catergories = Catergories.NONE) {
        this.name = name;
        this.body = body;
        this.date = date,
        this.checklist = checklist;
        this.category = category;
    }

    public get name(): string {
        return this._name;
    }
    
    public set name(value: string) {
        this._name = value;
    }

    public get body(): string {
        return this._body;
    }
    
    public set body(value: string) {
        this._body = value;
    }

    public get date(): Date {
        return this._date;
    }
    
    public set date(value: Date) {
        this._date = value;
    }

    public get checklist(): boolean {
        return this._checklist;
    }
    
    public set checklist(value: boolean) {
        this._checklist = value;
    }

    public get category(): Catergories {
        return this._category;
    }

    public set category(value: Catergories) {
        this._category = value;
    }

}