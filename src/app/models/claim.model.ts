
export class ClaimModel
 {

    private readonly _value: string;
    private readonly _type: string;

    constructor(value: string, type: string) {
        this._type = value;
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public get type() {
        return this._type;
    }
}
