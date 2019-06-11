import { GameObject } from "./GameObject";

export class Briefcase extends GameObject {
    id: number;
    money: bigint;
    isOpen: boolean = false;

    constructor(id: number, money: bigint) {
        super();
        this.id = id;
        this.money = 100n;
    }
}