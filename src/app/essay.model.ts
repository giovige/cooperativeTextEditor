export class Essay {
    id: number;
    voto: number;
    stato: string;
    idStudente: string;
    lastModified: number;

    constructor( id: number,
        voto: number,
        stato: string,
        idStudente: string,
        
        lastModified: number

    ) {
        this.id=id;
        this.voto= voto;
        this.stato= stato;
        
        this.idStudente=idStudente;
      
        this.lastModified=lastModified;
    }
}
