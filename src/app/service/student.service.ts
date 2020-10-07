import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatAll, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /*
npx json-server-auth virtuallabs.json -r virtuallabs_routes.json
*/
  
  private API_PATH = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  enrolled: Student[] = [];

  students: Student[]= [];


  getAllStudents(): Observable<Student[]> {     //tutti gli studenti => opzioni per form
    //return of(this.students);
    return this.http.get<Student[]>(this.API_PATH + 'students');
  }


  query(): Observable<Student[]> {      //studenti iscritti al corso
    return this.http.get<Student[]>(this.API_PATH + 'courses/1/students');
    //return of(this.enrolled);
  }
  




  updateDelete(studList: Student[]): Observable<Student> {
    studList.forEach(s => s.courseId='0');

    return <Observable<Student>> forkJoin(
      studList.map(s => {
        return <Observable<Student>> this.http.put(`${this.API_PATH}students/${s.id}`, s, this.httpOptions);
      })
    ).pipe(concatAll());
  }

  updateAdd(stud: Student, Cid: string): Observable<any> {
    stud.courseId=Cid;
    return this.http.put(`${this.API_PATH}students/${stud.id}`, stud, this.httpOptions);
  }




}
