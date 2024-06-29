import { UserModel } from "../../models/user.model"
import { LoginResponseDTO } from "../../dto/responses/login-response.dto"
import { LoginRequestDTO } from "../../dto/requests/login-request.dto";
import { TokenInfoMapperService } from "./tokeninfo-mapper.service";
import { ClaimMapperService } from "./claim-mapper.service";

export abstract class LoginMapperService {

    public static Map(dto: LoginResponseDTO) : UserModel {
        return new UserModel(dto.id,
                            dto.name,
                            dto.email, 
                            TokenInfoMapperService.mapToModel(dto.tokenInfo),
                            dto.claims.map(claim => ClaimMapperService.mapToModel(claim)));
    } 
}