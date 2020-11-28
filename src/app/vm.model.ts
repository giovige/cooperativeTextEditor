import { Group } from './group.model';
import { Student } from './student.model';

export class Vm {
    id: number;
    vcpu: number;
    gbdisk: number;
    gbram: number;
    status: string;
    idCreatore: string;
    screenVm: any;

    constructor(    id: number,
        vcpu: number,
        gbdisk: number,
        gbram: number,
        status: string,
        idCreatore: string,
        screenVm: any
    ) {
        this.id=id;
        this.status=status;
        this.vcpu=vcpu;
        this.gbdisk=gbdisk;
        this.gbram=gbram;
        this.idCreatore=idCreatore;
        this.screenVm= screenVm;
    }
}


