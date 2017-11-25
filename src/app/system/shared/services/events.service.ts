import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SPREvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: SPREvent): Observable<SPREvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<SPREvent[]> {
    return this.get('events');
  }
}
