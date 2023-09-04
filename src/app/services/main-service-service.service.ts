import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, of, pipe, throwError } from 'rxjs';
import { catchError, concatMap, map, retryWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseStruct } from '../structures/ResponseStructure';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class MainServiceServiceService {

  private url;
  constructor(public http : HttpClient, private notifier : NotifierService) { 
    this.url = environment.baseUrl;
  }

  getService(serviceName : string, params : object) : Observable<any> {
    //PREPARING THE REQUEST OBJECT.
    let obj = {
      name : serviceName,
      param : params
    };
    return this.http.post<any>(this.url, obj);
  }

  //GETTING THE TOKEN FORM THE LOCALSTORAGE.
  getToken() {
    return localStorage.getItem('Token');
  }

  //REUSABE PIPE FOR HANDLING THE ERROR (RETRIES 2 TIMES AND THEN SHOWS THE SNACKBAR)
  handleErrorPipe = () => pipe(
    retryWhen(error => {
      return error.pipe(
        concatMap((e, i) => 
        iif(
          () => i > 2,
          throwError(e),
          of(e)
        )
      )
    )
    }),
    catchError(err => {
      this.notifier.ShowNotification( "500" , "Server Timed Out: Please Try Again later", "Dismiss");
      // alert("Server Timed Out: Please Try Again later");
      return of(false);
    })   
  );


  //REUSABLE ERROR HANDLING FUNCTION FOR GETSERVICE.
  ResponseObject : ResponseStruct;
  HandleResponse(response : any){
    let statuskey = Object.keys(response)[0];
    let errormessage = "";
    let errorstatus = '';
    if (statuskey == 'error'){
      let errors = response[statuskey];
      errorstatus = errors["status"];
      errormessage = errors["message"];
      if (errorstatus != '301'){
        this.notifier.ShowNotification(errorstatus, errormessage, "Dismiss" );
        // alert(errormessage);
        return false;
      }
      else {
        return "Token Invalid";
      }
    }
    else {
      this.ResponseObject = response[statuskey];
      if(this.ResponseObject.status != "200"){
        let datakeys = Object.keys(this.ResponseObject.Data)[0];
        errormessage = this.ResponseObject.Data[datakeys];
        status = this.ResponseObject.status;
        //this.notifier.ShowNotification(errorstatus, errormessage, "Dismiss");
        return false;
      }
      else {
        return this.ResponseObject.Data;
      }

    }
  }

  //CHECKING IF THE USER IS LOGGED IN.
  isloggedIn() {
    return !!localStorage.getItem('Token');
  }
}
