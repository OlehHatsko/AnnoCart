import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private dataFile = new BehaviorSubject<File>(null);
	currentFile = this.dataFile.asObservable();

	constructor() {}

	public changeFile(file: File){
		this.dataFile.next(file);
	}
}