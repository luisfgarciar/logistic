export interface IProvider {
    id?: number;
    name?: string;
    address?: string;
    email?: string;
}

export class Provider implements IProvider {
    constructor(public id?: number, public name?: string, public address?: string, public email?: string) {}
}
