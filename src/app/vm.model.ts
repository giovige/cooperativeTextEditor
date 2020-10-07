import { Group } from './group.model';
import { Student } from './student.model';

export class Vm {
    id: number;
    vcpu: number;
    GBDisk: number;
    GBRam: number;
    status: number;
    

    constructor(    id: number,
        vcpu: number,
        GBDisk: number,
        GBRam: number,
        status: number,
    ) {
        this.id=id;
        this.status=status;
        this.vcpu=vcpu;
        this.GBDisk=GBDisk;
        this.GBRam=GBRam;
    }
}
