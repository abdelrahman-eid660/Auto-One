import { Injectable } from '@angular/core';
import { APIFunctionService } from './apifunction.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends APIFunctionService {

  constructor(protected override http : HttpClient) {
    super("https://auto.eida0556.workers.dev/services",http)
   }
}
