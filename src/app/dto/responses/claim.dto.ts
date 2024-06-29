export class CLaimDTO {
    public readonly value: string;
    public readonly type: string;

    constructor(value: string, type: string) {
        this.type = value;
        this.value = value;
    }
}