import { Injectable } from '@angular/core';
import { APIFunctionService } from './apifunction.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends APIFunctionService {
  getByCustomerId(customerId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(protected override http : HttpClient) {
    super('https://auto.eida0556.workers.dev/subscription',http)
   }
}
