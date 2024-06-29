import { CLaimDTO } from "../../dto/responses/claim.dto";
import { ClaimModel } from "../../models/claim.model";

export abstract class ClaimMapperService {

    public static mapToModel (dto: CLaimDTO) : ClaimModel {
        return new ClaimModel(dto.value, dto.value);
    }

    public static mapToDTO (model: ClaimModel) : CLaimDTO {
        return new CLaimDTO(model.value, model.value);
    }
}