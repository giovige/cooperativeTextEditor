import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatAll, mergeMap } from 'rxjs/operators';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /*
npx json-server-auth virtuallabs.json -r virtuallabs_routes.json
*/
  
  private API_PATH ='API/';

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



  getEnrolled(course_name: string): Observable<Student[]> {      //studenti iscritti al corso
    return this.http.get<Student[]>(this.API_PATH + 'courses/'+course_name+'/enrolled');
    //return of(this.enrolled);
  }

  getStudentCourses(stud_id: string): Observable<any> {     
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id +'/courses');

  }


  getCourses(): Observable<any> {     
    return this.http.get<string[]>(this.API_PATH + 'courses/');

  }


  deleteCourse(name: string): Observable<any> {   
    alert("omg");  
    return this.http.delete<string[]>(this.API_PATH + 'courses/'+name);
  }



  updateDelete(studList: Student[], course:string): Observable<Student> {
    return <Observable<Student>> forkJoin(
      studList.map(s => {
        return <Observable<Student>> this.http.put(`${this.API_PATH}courses/${course}/unsubscribeOne/${s.id}`, s, this.httpOptions);
      })
    ).pipe(concatAll());
  }

  
  updateAdd(stud: Student, course: string): Observable<any> {
    console.log('corso'+course);
    return this.http.post(`${this.API_PATH}courses/${course}/enrollOne`, stud, this.httpOptions);
    }


    
}
