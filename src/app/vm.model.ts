import { Group } from './group.model';
import { Student } from './student.model';

export class Vm {
    id: number;
    vcpu: number;
    GBDisk: number;
    GBRam: number;
    status: number;
    idCreatore: string;
    team: Group;
    owners: Student[];
}
