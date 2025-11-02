import { Injectable } from '@angular/core';
import { APIFunctionService } from './apifunction.service';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminsService extends APIFunctionService {

  constructor(protected override http : HttpClient) {
    super("http://localhost:3000/admins",http)
   }
}
