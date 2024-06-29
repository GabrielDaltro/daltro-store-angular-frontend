import { TokenInfoDTO } from "../../dto/responses/tokeninfo.dto";
import { TokenInfoModel } from "../../models/tokenInfo.model";

export abstract class TokenInfoMapperService {

    public static mapToModel (dto: TokenInfoDTO) : TokenInfoModel {
        return new TokenInfoModel(dto.accessToken, dto.expiresIn);
    }
    public static mapToDto (model: TokenInfoModel) : TokenInfoDTO {
        return new TokenInfoDTO(model.accessToken, model.expiresIn);
    }
}