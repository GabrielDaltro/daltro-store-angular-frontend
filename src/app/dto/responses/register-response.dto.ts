export class RegisterResponseDTO {

    public readonly id: string;
    public readonly name: string; 
    public readonly email: string;
    public readonly tokenInfo: TokenInfoDTO;
    public readonly claims: CLaimDTO[];

    constructor(id: string, name: string, email: string, tokenInfo: TokenInfoDTO, claims: CLaimDTO[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.tokenInfo = tokenInfo;
        this.claims = claims;
    }
}

class TokenInfoDTO {

    public readonly accessToken: string;
    public readonly expiresIn: number;

    constructor(accessToken: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
}

class CLaimDTO {
    private readonly value: string;
    private readonly type: string;

    constructor(value: string, type: string) {
        this.type = value;
        this.value = value;
    }
}