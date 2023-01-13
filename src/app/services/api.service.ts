import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postTodo(todo: any){
    return this.http.post<any>("http://localhost:3000/todoList/",todo);
  }
  getTodo(){
    return this.http.get<any>("http://localhost:3000/todoList/");
  }
  putTodo(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/todoList/"+id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  deleteTodo(id: number){
    return this.http.delete<any>("http://localhost:3000/todoList/"+id).pipe(map((res:any) => {
      return res;
    }))
  }
}
