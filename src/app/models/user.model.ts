import { TokenInfoModel } from "./tokenInfo.model";
import { ClaimModel } from "./claim.model";

export class UserModel { 
    
    private readonly _id: string;
    private readonly _name: string; 
    private readonly _email: string;
    private readonly _tokenInfo: TokenInfoModel;
    private readonly _claims: ClaimModel[];

    constructor(id: string, name: string, email: string, tokenInfo: TokenInfoModel, claims: ClaimModel[]) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._tokenInfo = tokenInfo;
        this._claims = claims;
    }

    public get id() {
        return this._id;
    }
    
    public get name() {
        return this._name;
    }

    public get email() {
        return this._email;
    }

    public get tokenInfo() {
        return this._tokenInfo;
    }

    public get claims() {
        return this._claims;
    }
}