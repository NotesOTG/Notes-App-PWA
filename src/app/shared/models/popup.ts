import { ButtonType } from "./button-types";

export class Popup {

    private _title: string;

    private _body: string;

    private _action: ButtonType;

    constructor(title: string, body: string, action: ButtonType) {
        this._title = title;
        this._body = body;
        this._action = action;
    }

    public get title(): string {
        return this._title;
    }

    public get body(): string {
        return this._body;
    }

    public get action(): ButtonType {
        return this._action;
    }
}

export interface IPopup {
    title: string;
    body: string;
    action: ButtonType;
}