export class Task {
    id: number;
    dataRilascio: string;
    dataScadenza: string;
    description: any;



    constructor( id: number,
        dataRilascio: string,
        dataScadenza: string,
        description: any
    ) {
        this.id=id;
        this.dataRilascio= dataRilascio;
        this.dataScadenza= dataScadenza;
        this.description=description;
    }
}
