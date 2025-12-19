import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIFunctionService } from './apifunction.service';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService extends APIFunctionService {

    constructor(protected override http : HttpClient) {
    super("https://auto.eida0556.workers.dev/order-products",http)
   }
}
