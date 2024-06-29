import { RegisterRequestDTO } from "../../dto/requests/register-request.dto";
import { RegisterResponseDTO } from "../../dto/responses/register-response.dto";
import { RegisterModel } from "../../models/register.model";
import { UserModel } from "../../models/user.model";
import { ClaimMapperService } from "./claim-mapper.service";
import { TokenInfoMapperService } from "./tokeninfo-mapper.service";

export abstract class RegisterMapperService {
    
    public static MapToModel(dto: RegisterResponseDTO) : UserModel {
        return new UserModel(dto.id,
                            dto.name,
                            dto.email, 
                            TokenInfoMapperService.mapToModel(dto.tokenInfo),
                            dto.claims.map(claim => ClaimMapperService.mapToModel(claim)));
    } 

    public static MapToDTO(model: RegisterModel) : RegisterRequestDTO {
        return new RegisterRequestDTO(model.name, model.email, model.password, model.confirmPassword);
    } 
}