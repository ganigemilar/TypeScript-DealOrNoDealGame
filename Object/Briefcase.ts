import { GameObject } from "./GameObject";

export class Briefcase extends GameObject {
    id: number;
    money: number;

    constructor(id: number, money: number = 0) {
        super();
        this.id = id;
        this.money = money;
    }
}