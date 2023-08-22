import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  heading$: BehaviorSubject<string> = new BehaviorSubject<string>('Project Dashboard')
  constructor() { }
}
