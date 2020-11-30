export class Image {
    id: number;
    data: any;
    filename: string;
    idCreator: string;
    creationDate: string;

    constructor( id: number,
        filename: string,
        data: any,
        idCreator: string,
        creationDate: string

    ) {
        this.id=id;
        this.creationDate= creationDate;
        this.filename= filename;
        this.data=data;
        this.idCreator=idCreator;
    }
};