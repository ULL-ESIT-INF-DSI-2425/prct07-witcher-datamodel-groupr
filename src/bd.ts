// db.ts
import { Low, LowSync } from 'lowdb';
import { JSONFile, JSONFileSync } from 'lowdb/node';

export interface DataEntry<Data> {
  key: number;
  value: Data;
}

export interface Database<T> {
  data: DataEntry<T>[];
}

export class GenericDatabase<T> {
  private _db: LowSync<Database<T>>;

  constructor(dbFile: string = './db/db.json') {
    const adapter = new JSONFileSync<Database<T>>(dbFile);
    
    this._db = new LowSync<Database<T>>(adapter, {data: []});
    this._db.read();
  }

  filterEntry(key: number): T | undefined {
    const result : T | undefined = this._db.data.data.find((val: DataEntry<T>) => val.key === key)?.value
    return result;
  }

  addEntry(key: number, value: T): void {
    if (this.filterEntry(key) != undefined) {
      throw new Error('Cannot insert value in database: Value alredy in');
    }
    this._db.data.data.push({ key, value });
    this._db.write();
  }

  deleteEntry(key: number): void {
    const result = this._db.data.data.filter((val: DataEntry<T>) => val.key !== key);
    this._db.data.data = result;
    this._db.write();
  }

  getAllEntries(): DataEntry<T>[] {
    return this._db.data.data;
  }
}

const db = new GenericDatabase<string>();


// import { TodoItem } from "./todoItem.js";
// import { TodoCollection } from "./todoCollection.js";
// import { LowSync } from "lowdb";
// import { JSONFileSync } from "lowdb/node";
// type schemaType = {
// tasks: { id: number; task: string; complete: boolean; }[]
// };
// export class JsonTodoCollection extends TodoCollection {
// private database: LowSync<schemaType>;
// constructor(public userName: string, todoItems: TodoItem[] = []) {
// super(userName, []);
// this.database = new LowSync(new JSONFileSync("Todos.json"));
// this.database.read();
// if (this.database.data == null) {
// this.database.data = { tasks : todoItems};
// this.database.write();
// todoItems.forEach(item => this.itemMap.set(item.id, item));
// } else {
// this.database.data.tasks.forEach(item =>
// this.itemMap.set(item.id,
// new TodoItem(item.id, item.task, item.complete)));
// }
// }
// addTodo(task: string): number {
// let result = super.addTodo(task);
// this.storeTasks();
// return result;
// }
// markComplete(id: number, complete: boolean): void {
// super.markComplete(id, complete);
// this.storeTasks();
// }
// removeComplete(): void {
// super.removeComplete();
// this.storeTasks();
// }
// private storeTasks() {
// this.database.data.tasks = [...this.itemMap.values()];
// this.database.write();
// }


// import { TodoItem } from "./todoItem.js";
// type ItemCounts = {
// total: number,
// incomplete: number
// }
// export class TodoCollection {
// private nextId: number = 1;
// protected itemMap = new Map<number, TodoItem>();
// constructor(public userName: string, todoItems: TodoItem[] = []) {
// todoItems.forEach(item => this.itemMap.set(item.id, item));
// }
// // ...methods omitted for brevity...
// }