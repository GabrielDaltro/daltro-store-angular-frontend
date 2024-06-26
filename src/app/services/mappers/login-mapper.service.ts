import { UserModel } from "../../models/user.model"
import { LoginResponseDTO } from "../../dto/responses/login-response.dto"
import { LoginRequestDTO } from "../../dto/requests/login-request.dto";

export abstract class LoginMapperService {

    public static Map(dto: LoginResponseDTO) : UserModel {
        return new UserModel();
    } 

    public static Map(model: UserModel) : LoginRequestDTO {
        
    } 
}