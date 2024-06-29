export class TokenInfoDTO {

    public readonly accessToken: string;
    public readonly expiresIn: number;

    constructor(accessToken: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
}
