import { User } from "src/app/shared/models/user";
import { StorageService, StorageType } from "../services/offline/storage.service";

export class UserHandler {

    private _user: User;

    private storage: StorageService;

    constructor(storage: StorageService) {
        this.storage = storage;
    }

    public loadUserInternal(): UserHandler {
        this.storage.getTable(StorageType.USER).get(0).then(val => {
            this._user = val;
        });
        return this;
    }

    public isUserExisting(): boolean {
        return this._user != null
    }

    public getUser(): User {
        return this._user;
    }

    public async addUser(user: User): Promise<void> {
        if (user == null) {
            return;
        }
        this._user = user;
        await this.storage.getTable(StorageType.USER).clear();
        await this.storage.getTable(StorageType.USER).add(user, 0);
    }

    public async removeUser(): Promise<void> {
        this._user = null;
        await this.storage.getTable(StorageType.USER).clear();
    }

}