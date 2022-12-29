import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../services/api.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  categories = [
    {title: 'Lista', active: true,}
    //{title: 'Work', active: false}
  ]

  selectedTasks: string[] = [];

  displayedColumns: string[] = ['checked', 'id', 'text', 'descricao', 'criacao', 'conclusao', 'actions'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {  }

  checkCheckBoxvalue(event: any, row: any){
    console.log(event.checked);

    var todo = [
      {
        "id": row.id,
        "text": row.text,
        "descricao": row.descricao,
        "criacao": row.criacao,
        "conclusao": row.conclusao,
        "checked": event.checked
      }];

    console.log(Object.values(todo));

    this.api.putTodo(Object.values(todo), row.id).subscribe();

    this.getAllTodos();

  }

  ngOnInit(): void {
    this.getAllTodos()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getAllTodos() {
    this.api.getTodo()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        alert("Erro na busca dos registros!")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCategory(category: any){
    this.markAllCategoriesInactive();
    category.active = true;
  }

  markAllCategoriesInactive(){
    this.categories.map((category) => {
      category.active = false;
      return category;
    });
  }

  onCreateClicked(): void {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '600px',
      data: this.api
    }).afterClosed().subscribe(val => {
      if(val === 'salvo'){
        this.getAllTodos();
      }
    })
  }

  editTodo(row: any) {
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '600px',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'atualizado'){
        this.getAllTodos();
      }
    })
  }

  deleteTodo(row : any) {
    this.api.deleteTodo(row.id).subscribe( res => {
        alert("Tarefa deletada com sucesso!");
        this.getAllTodos();
    })
  }

}
