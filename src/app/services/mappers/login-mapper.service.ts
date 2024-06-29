import { UserModel } from "../../models/user.model"
import { LoginResponseDTO } from "../../dto/responses/login-response.dto"
import { LoginRequestDTO } from "../../dto/requests/login-request.dto";
import { TokenInfoMapperService } from "./tokeninfo-mapper.service";
import { ClaimMapperService } from "./claim-mapper.service";
import { LoginModel } from "../../models/login.model";

export abstract class LoginMapperService {

    public static MapToModel(dto: LoginResponseDTO) : UserModel {
        return new UserModel(dto.id,
                            dto.name,
                            dto.email, 
                            TokenInfoMapperService.mapToModel(dto.tokenInfo),
                            dto.claims.map(claim => ClaimMapperService.mapToModel(claim)));
    } 

    public static MapToDTO(model: LoginModel) : LoginRequestDTO {
        return new LoginRequestDTO(model.email, model.password);
    }
}