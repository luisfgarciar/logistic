export interface IProductType {
    id?: number;
    name?: string;
    alias?: string;
}

export class ProductType implements IProductType {
    constructor(public id?: number, public name?: string, public alias?: string) {}
}
