import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class IOService implements OnDestroy {
  private socket: Socket;
  private events: Subject<any> = new Subject();
  constructor() {}

  init() {
    this.socket = io('http://localhost:3000', {
      auth: {
        token: localStorage.getItem('access-token')
      }
    });

    this.socket.onAny()  }

  on(eventName: string): Observable<any> {
    new Observable(subscriber => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  ngOnDestroy() {
    this.socket?.emit('disconnect');
    this.socket?.disconnect();
  }
}
