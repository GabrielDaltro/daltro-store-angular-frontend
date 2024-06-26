
export class TokenInfoModel {

    private readonly _accessToken: string;
    private readonly _expiresIn: number;

    constructor(accessToken: string, expiresIn: number) {
        this._accessToken = accessToken;
        this._expiresIn = expiresIn;
    }

    public get accessToken() {
        return this._accessToken;
    }

    public get expiresIn() {
        return this._expiresIn;
    }
}
