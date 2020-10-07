export class Essay {
    id: number;
    voto: number;
    stato: number;

    constructor( id: number,
        voto: number,
        stato: number
    ) {
        this.id=id;
        this.voto= voto;
        this.stato= stato;
    }
}
