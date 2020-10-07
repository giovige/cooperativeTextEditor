export class Task {
    id: number;
    dataRilascio: number;
    dataScadenza: number;



    constructor( id: number, dataRilascio: number, dataScadenza: number) 
    {
        this.id=id;
        this.dataRilascio= dataRilascio;
        this.dataScadenza= dataScadenza
    }
}
