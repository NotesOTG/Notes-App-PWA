export class Popup {

    private _title: string;

    private _body: string;

    private _action: PopupType;

    constructor(title: string, body: string, action: PopupType) {
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

    public get action(): PopupType {
        return this._action;
    }
}

export enum PopupType {
    SAVE = 'Save',
    CANCEL = 'Cancel',
    INSTALL = 'Install',
    ALLOW = 'Allow'
}

export interface IPopup {
    title: string;
    body: string;
    action: PopupType;
}