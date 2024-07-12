import { TokenInfoModel } from "../../models/tokenInfo.model";
import { UserModel } from "../../models/user.model";

export class LocalStorageUtils {

    public getUser() : UserModel | null {
        const jsonUser = localStorage.getItem('daltrostore.user');
        if (jsonUser == null) return null;
        const parsedUser = JSON.parse(jsonUser);
        return LocalStorageUtils.mapUserModelFromJson(parsedUser);
    }

    public saveUser(user: UserModel) {
        localStorage.setItem("daltrostore.user", JSON.stringify(user));
    }

    public cleanLocalUserData() {
        localStorage.removeItem("daltrostore.user");
    }

    public getUserToken() :string | null {
        const user: UserModel | null = this.getUser();
        if (user == null)
            return null;

        const tokenInfo =  user.tokenInfo;
        const token = tokenInfo.accessToken;
        return  token;
    }

    private static mapUserModelFromJson(json: any) : UserModel {              
        const tokenInfo = LocalStorageUtils.mapTokenInfoFromJson(json._tokenInfo);
        return new UserModel(json._id, json._name, json._email, tokenInfo, json._claims);
    }

    private static mapTokenInfoFromJson(json: any) : TokenInfoModel {
        return new TokenInfoModel(json._accessToken, json._expiresIn);
    }
}