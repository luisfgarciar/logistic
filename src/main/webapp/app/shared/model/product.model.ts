import { IProductType } from 'app/shared/model/product-type.model';
import { IProvider } from 'app/shared/model/provider.model';

export interface IProduct {
    id?: number;
    name?: string;
    productType?: IProductType;
    provider?: IProvider;
}

export class Product implements IProduct {
    constructor(public id?: number, public name?: string, public productType?: IProductType, public provider?: IProvider) {}
}
