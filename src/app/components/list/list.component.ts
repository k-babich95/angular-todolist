import { Component, OnInit, Input } from '@angular/core';

import { IToDoItem } from 'src/app/models/entities/IToDoItem';
import { TodoItemsService } from 'src/app/services/todo-items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  toDoItems: IToDoItem[];

  constructor(private toDoItemsService: TodoItemsService) { }

  ngOnInit() {
    this.getData();
  }

  public show(): void {
    console.log(this.toDoItems);
  }

  public getData(): void {
    this.toDoItemsService.getData(15).then(data => {
      this.toDoItems = data;
    });
  }

  public createNewItem(newItem: IToDoItem): void {
    this.toDoItemsService.createItem(newItem)
      .then(newId => {
        newItem.id = newId;
        console.log(newItem);
        this.toDoItems.push(newItem);
      })
    
  }

  public deleteItem(id: number): void {
    const index = this.toDoItems
      .findIndex(el => el.id === id);

    if (index > -1) {
      this.toDoItemsService.deleteItem(id);
      this.toDoItems.splice(index, 1); 
    }
  }
}
