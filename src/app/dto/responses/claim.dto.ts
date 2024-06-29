export class CLaimDTO {
    private readonly value: string;
    private readonly type: string;

    constructor(value: string, type: string) {
        this.type = value;
        this.value = value;
    }
}