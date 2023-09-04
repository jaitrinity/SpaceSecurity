import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MainServiceServiceService } from './main-service-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {
  constructor(private injector : Injector) { }

  intercept(req , next) {

    let MainService = this.injector.get(MainServiceServiceService);
    let tokenizedreq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${MainService.getToken()}` 
      }
    })
    return next.handle(tokenizedreq);
  }
}
