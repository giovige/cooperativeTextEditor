import { Student } from './student.model';

export class Group {
    id: number;
    name: string;
    status: number;
    vcpuTot: number;
    GBDiskTot: number;
    GBRamTot: number;
    vcpuUsati: number;
    GBDiskUsati: number;
    GBRamUsati: number;

    constructor( id: number,
        name: string,
        status: number,
        vcpuTot: number,
        GBDiskTot: number,
        GBRamTot: number,
        vcpuUsati: number,
        GBDiskUsati: number,
        GBRamUsati: number
    ) {
        this.id=id;
        this.name=name;
        this.status=status;
        this.vcpuTot=vcpuTot;
        this.GBDiskTot=GBDiskTot;
        this.GBRamTot=GBRamTot;
        this.vcpuUsati=vcpuUsati;
        this.GBDiskUsati=GBDiskUsati;
        this.GBRamUsati=GBRamUsati
    }


}