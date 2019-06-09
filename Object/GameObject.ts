export abstract class GameObject {
    private static _objectId: number;

    constructor() {
        GameObject._objectId++;
    }

    get objectId() {
        return GameObject._objectId;
    }
}