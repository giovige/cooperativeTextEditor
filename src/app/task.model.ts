export class Task {
    id: number;
    dataRilascio: string;
    dataScadenza: string;



    constructor( id: number, dataRilascio: string, dataScadenza: string) 
    {
        this.id=id;
        this.dataRilascio= dataRilascio;
        this.dataScadenza= dataScadenza
    }
}
