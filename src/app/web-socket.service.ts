import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000');
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  onMessage(): Observable<any> {
    return this.socket$.asObservable();
  }
}
