import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatAll, mergeMap } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Group } from '../group.model';
import { Vm } from '../vm.model';


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
    console.log('getStudentCourses');
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id +'/courses');

  }

  //------------------------------------->NUOVE API STUDENTE<----------------------------------------------------------------------

  studentHasTeam(stud_id: string, course: string): Observable<boolean> {
    //console.log('quiuiufijckvb   '+ stud_id + '  ' + course);
    return this.http.get<boolean>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/hasTeam');
  }


  getStudentTeamByCourse(stud_id: string, course: string): Observable<any> {    //prende GRUPPO dello studente relativo ad un corso
    //console.log('------------->getStudentTeamByCourse');
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/teams');
  }


  getTeamMembers(id: string): Observable<any> {
    return this.http.get<string[]>(this.API_PATH + 'students/' +  '/teams/' + id +'/members');
  }



  

  getNoTeamStudents(course: string) {   //prende Studenti senza gruppo
    //console.log('------------->getNoTeamStudents');
    return this.http.get<string[]>(this.API_PATH + 'courses/' + course +'/availableStudents');
  }

  addTeamRequest() {      //manda richiesta per un nuovo gruppo
    //console.log('------------->addTeamRequest');

  }


  getTeamRequests(stud_id: string, course: string) {     //richieste di uno studente per aderire a gruppi
    //console.log('------------->getTeamRequests');
    return this.http.get<string[]>(this.API_PATH + 'students/' + stud_id + '/courses/' + course +'/requests');
  }


  //----------------------------------------------tab_VM------------------------------------------------------------------

  getStudentVMsByCourse(stud_id: string, teamId: number): Observable<any> {    // GetMapping("/{id}/teams/{teamId}/vms") 
    //console.log('------------->getStudentVMsByCourse');
    return this.http.get<Vm[]>(this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms');
  }


  changeStatusToVM(stud_id: string, teamId: number, vmId: number): Observable<any> {
    //console.log('------------->changeStatusToVM');
    //PutMapping("/{id}/teams/{teamid}/vms/{vmId}/switch")
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId + '/switch';
    return this.http.put<any>(path, {vmId}, this.httpOptions);
  }


  changeVmParameters(stud_id: string, teamId: number, vmId: number, newparams: Vm): Observable<any> {
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId + '/edit';
    return this.http.put<any>(path, {vcpus: newparams.vcpu, gbram: newparams.GBRam, gbdisk: newparams.GBDisk}, this.httpOptions);
  }


  createNewVM (stud_id: string, teamId: number, newVM: Vm): Observable<any> {
    //console.log('------------->createNewVM');
    //PostMapping("/{id}/teams/{teamId}/vm")
    let dto = JSON.stringify(newVM);
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vm';
    return this.http.post<any>(path, {dto: newVM}, this.httpOptions);
  }


  deleteVM(stud_id: string, teamId: number, vmId: number ): Observable<any> {
    //console.log('------------->deleteVM');
    //DeleteMapping("/{id}/teams/{teamid}/vms/{vmId}")
    let path = this.API_PATH + 'students/' + stud_id + '/teams/' + teamId +'/vms/' + vmId;
    return this.http.delete<any>(path, this.httpOptions);
  }

  //----------------------------------------------tab_TASKS------------------------------------------------------------------

  getTasksForCourse(course: string): Observable<any> {     //ottiene consegne di un docente
    console.log('------------->getTasksForCourse');
    let path = this.API_PATH + 'courses/'+ course + '/tasks';
    return this.http.get<any>(path);
  }

  getEssaysByTask(course: string, taskId:number): Observable<any> {   //@GetMapping("/{name}/tasks/{taskId}/myEssays")
    console.log('------------->getEssaysByTask');
    let path = this.API_PATH + 'courses/'+ course + '/tasks/' + taskId + '/myEssays';
    return this.http.get<any>(path);
  }


  addStudentEssay(course: string, taskId:number): Observable<any> {   //sottomette un elaborato scritto dallo studente
    console.log('------------->addStudentEssay');
    let path = this.API_PATH + 'courses/'+ course + '/tasks/' + taskId + '/essay';
    return this.http.post<any>(path, {} ,this.httpOptions);
  }


/*
API/courses

    @GetMapping("/{name}/tasks/{taskId}/myEssays")
    public List<EssayDTO> getStudentEssay(@PathVariable String taskId, @PathVariable String name, @PathVariable String essayId,@AuthenticationPrincipal UserDetails userDetails){
     


    
*/
}
