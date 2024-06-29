import { UserModel } from "../../models/user.model"
import { LoginResponseDTO } from "../../dto/responses/login-response.dto"
import { LoginRequestDTO } from "../../dto/requests/login-request.dto";

export abstract class LoginMapperService {

    public static Map(dto: LoginResponseDTO) : UserModel {
        return new UserModel(dto.id, dto.name, dto.email, dto.tokenInfo, dto.claims);
    } 

    public static Map(model: UserModel) : LoginRequestDTO {
        return new LoginRequestDTO();
    } 
}