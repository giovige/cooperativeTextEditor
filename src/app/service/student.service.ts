import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { concatAll, mergeMap } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Group } from '../group.model';
import { Vm } from '../vm.model';
import { Essay } from '../essay.model';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Token } from '../token.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
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


  getStudentCourses(stud_id: string): Observable<any> {     
    //console.log('getStudentCourses');
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id +'/courses');

  }

  //------------------------------------->NUOVE API STUDENTE<----------------------------------------------------------------------

  studentHasTeam(stud_id: string, course: string): Observable<boolean> {
    return this.http.get<boolean>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/hasTeam');
  }


  getStudentTeamByCourse(stud_id: string, course: string): Observable<any> {    //prende GRUPPO dello studente relativo ad un corso
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/teams');
  }


  getTeamMembers(id: number): Observable<any> {
    return this.http.get<string[]>(this.API_PATH + 'students/' +  '/teams/' + id +'/members');
  }



  

  getNoTeamStudents(course: string): Observable<any>  {   //prende Studenti senza gruppo
    return this.http.get<Student[]>(this.API_PATH + 'courses/' + course +'/availableStudents');
  }

  getTeamRequests(stud_id: string, course: string): Observable<any>  {    //richieste di uno studente per aderire a gruppi (requests = tokenDTO)
    return this.http.get<Token[]>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/requests');
  }

  getInvitedToAGroup(stud_id: string, course: string, teamId: number): Observable<any>  {      
    let path = this.API_PATH + 'students/' + stud_id + '/courses/' + course + '/teams/' + teamId +'/studentsrequests';
    return this.http.get<Student[]>(path);
  }


  proposeTeamRequest(course: string, members: any, teamName: string, to: any): Observable<any> {      //manda richiesta per un nuovo gruppo
    const data: FormData = new FormData();
    data.append('team', teamName );
    data.append('timeout', to );
    data.append('membersIds', members );
    let path = this.API_PATH + 'courses/' + course +'/proposeTeam';
    return this.http.post(path, data, {
      reportProgress: true,
      responseType: 'text'
      });
  }


  acceptRequest(tokenString: string): Observable<any> {
    let path = this.API_PATH + 'notification/' + 'confirm/' + tokenString;
    return this.http.get<any>(path);
  }


  rejectRequest(tokenString: string): Observable<any> {
    let path = this.API_PATH + 'notification/' + 'reject/' + tokenString;
    return this.http.get<any>(path);
  }

  //----------------------------------------------tab_VM------------------------------------------------------------------

  getStudentVMsByCourse(stud_id: string, teamId: number): Observable<any> {    // GetMapping("/{id}/teams/{teamId}/vms") 
    return this.http.get<Vm[]>(this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms');
  }


  changeStatusToVM(stud_id: string, teamId: number, vmId: number): Observable<any> {
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId + '/switch';
    return this.http.put<any>(path, {vmId}, this.httpOptions);
  }


  changeVmParameters(stud_id: string, teamId: number, vmId: number, newparams: Vm): Observable<any> {
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId + '/changeParams';
    return this.http.put<any>(path, {vcpus: newparams.vcpu, gbram: newparams.gbram, gbdisk: newparams.gbdisk}, this.httpOptions);
  }


  createNewVM (stud_id: string, teamId: number, newVM: Vm): Observable<any> {
    let dto = JSON.stringify(newVM);
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vm';
    return this.http.post<any>(path, {dto: newVM}, this.httpOptions);
  }


  setImageVM(stud_id: string, teamId: number, vmId: number, imageFile: File) {
    const data: FormData = new FormData();
    data.append('imageFile', imageFile);
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId;
    return this.http.put(path, data, { reportProgress: true, responseType: 'text'});
  }



  deleteVM(stud_id: string, teamId: number, vmId: number ): Observable<any> {
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId;
    return this.http.delete<any>(path, this.httpOptions);
  }

  //----------------------------------------------tab_TASKS------------------------------------------------------------------

  getTasksForCourse(course: string): Observable<any> {     //ottiene consegne di un docente
    //console.log('------------->getTasksForCourse');
    let path = this.API_PATH + 'courses/'+ course + '/tasks';
    return this.http.get<any>(path);
  }

/*   getEssaysByTask(course: string, taskId:number): Observable<any> {   //@GetMapping("/{name}/tasks/{taskId}/myEssays")
    console.log('------------->getEssaysByTask');
    let path = this.API_PATH + 'courses/'+ course + '/tasks/' + taskId + '/myEssays';
    return this.http.get<any>(path);
  } */

  getEssayIfExists(course: string, taskId:number,stud_Id: string): Observable<any> {   
    let path = this.API_PATH + 'courses/'+ course + '/task/' + taskId + '/studentId/' + stud_Id + '/essay';
    return this.http.get<Essay>(path);
  }

  createFirstEssay(course: string, taskId:number): Observable<any> {
    let path = this.API_PATH + 'courses/'+ course + '/task/' + taskId + '/essay';
    return this.http.post<any>(path, {} ,this.httpOptions);
  }


  getEssayStorical(course: string, stud_Id: string, taskId:number, essayId: number ): Observable<any> {
    let path = this.API_PATH + 'courses/'+ course + '/student/' + stud_Id + '/tasks/' + taskId + '/essays/' + essayId + '/mystorical';
    return this.http.get<any>(path);
  }



  addStudentEssay(course: string, taskId:number, essayId: number, imageFile: File) {   
    //sottomette un elaborato scritto dallo studente
    const data: FormData = new FormData();
    data.append('imageFile', imageFile);
    console.log(data);
    let path = this.API_PATH + 'courses/'+ course + '/tasks/' + taskId + '/essays/' + essayId;
    return this.http.put(path, data, { reportProgress: true, responseType: 'text'});
  }
  

}




