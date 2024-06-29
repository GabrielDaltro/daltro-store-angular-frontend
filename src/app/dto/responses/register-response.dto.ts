import { CLaimDTO } from "./claim.dto";
import { TokenInfoDTO } from "./tokeninfo.dto";

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