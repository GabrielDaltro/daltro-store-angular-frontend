import { RegisterResponseDTO } from "../../dto/responses/register-response.dto";
import { UserModel } from "../../models/user.model";
import { ClaimMapperService } from "./claim-mapper.service";
import { TokenInfoMapperService } from "./tokeninfo-mapper.service";

export class RegisterMapperService {
    public static Map(dto: RegisterResponseDTO) : UserModel {
        return new UserModel(dto.id,
                            dto.name,
                            dto.email, 
                            TokenInfoMapperService.mapToModel(dto.tokenInfo),
                            dto.claims.map(claim => ClaimMapperService.mapToModel(claim)));
    } 
}