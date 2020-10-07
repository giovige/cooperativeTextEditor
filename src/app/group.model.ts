import { Student } from './student.model';

export class Group {
    id: number;
    name: string;
    status: number;
    course: string;
    members: Student[];

    constructor( id: number, name: string,
        status: number, course: string, members: Student[]) {
        
    this.id = id;
    this.name = name;
    this.status = status;
    this.course = course;
    this.members = members;
    }


}
