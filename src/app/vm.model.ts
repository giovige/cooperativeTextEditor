import { Group } from './group.model';
import { Student } from './student.model';

export class Vm {
    id: number;
    vcpu: number;
    GBDisk: number;
    GBRam: number;
    status: string;
    idCreatore: string;
    screenVm: any;

    constructor(    id: number,
        vcpu: number,
        GBDisk: number,
        GBRam: number,
        status: string,
        idCreatore: string,
        screenVm: any
    ) {
        this.id=id;
        this.status=status;
        this.vcpu=vcpu;
        this.GBDisk=GBDisk;
        this.GBRam=GBRam;
        this.idCreatore=idCreatore;
        this.screenVm= screenVm;
    }
}


