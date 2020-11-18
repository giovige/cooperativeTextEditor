import { Group } from './group.model';
import { Student } from './student.model';

export class Vm {
    id: number;
    vcpu: number;
    GBDisk: number;
    GBRam: number;
    status: string;
    idCreatore: string;
    

    constructor(    id: number,
        vcpu: number,
        GBDisk: number,
        GBRam: number,
        status: string,
        idCreatore: string
    ) {
        this.id=id;
        this.status=status;
        this.vcpu=vcpu;
        this.GBDisk=GBDisk;
        this.GBRam=GBRam;
        this.idCreatore=idCreatore;
    }
}


