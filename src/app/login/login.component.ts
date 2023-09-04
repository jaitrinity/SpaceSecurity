import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticateModel } from './model/authenticateModel';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Constant } from '../constant/Constant';
import { CommonFunction } from '../constant/CommonFunction';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainServiceServiceService } from '../services/main-service-service.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ShowLoading = false;
  public loginModel : AuthenticateModel;

  //HIDING THE SHOW BUTTON BY DEFAULT.
  hide = true;
  invalid = false;
  tagLine = "Connecting Millions…..Where They Live, Work and Travel";
  facebookLink = "https://www.facebook.com/trinitymobileapp";
  linkedInLink = "https://www.linkedin.com/company/trinity-mobile-app-lab-pvt-ltd/";
  twitterLink = "https://twitter.com/trinity_app";
  loginPage = "#6699ff";
  button = "#f28f05";
  color1 = "#28c1f4";
  color2 = "#843dff";
  mobileNumber = "";
  otpNumber = "";
  newPassword = "";
  confirmPassword = "";
  validOTPNumber = "";
  isOTP_Validate : boolean = false;

  constructor(private mainService : MainServiceServiceService, private router:Router, private toastr: ToastrService,
    private titleService : Title) { 
      localStorage.clear();
      this.loginModel = new AuthenticateModel();
      this.titleService.setTitle("Login")
    }

  ngOnInit(): void {
    this.getAppUrl();
    let browser = CommonFunction.getBrowserName();
    localStorage.setItem("browser",browser);
  }

  getAppUrl(){
      localStorage.setItem("loginPage",this.loginPage);
      localStorage.setItem("button",this.button);
      localStorage.setItem("color1",this.color1);
      localStorage.setItem("color2",this.color2);
  }

  OnSubmitting() {
    let Logcheck$ = this.mainService.getService("authenticate", this.loginModel);
    Logcheck$.pipe(
      this.mainService.handleErrorPipe(),
      catchError(err => {
        return of([]);
      })
      // finalize(() => this.ShowLoading = false)
    ).subscribe(
      res => {
        if(res) {
          let datarecieved = this.mainService.HandleResponse(res);
          if (datarecieved) {
            localStorage.setItem('Token', datarecieved['token']);
            this.router.navigate(['/layout']);
          }
        }
      },
      err => console.log(err),
      () => {
        this.ShowLoading = false;
      }
    );
  //   this.ShowLoading = true
  //   this.mainServiceice.getService('authenticate',this.loginModel)
  //   .subscribe( (response) =>{
  //     this.ShowLoading = false
  //        if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
  //         // localStorage.setItem("empId",this.loginModel.username);
  //         localStorage.setItem("empId",response.wrappedList[0].empId);
  //         localStorage.setItem("empName",response.wrappedList[0].empName);
  //         localStorage.setItem("empMobile",this.loginModel.username);
  //         localStorage.setItem("empRoleId",response.wrappedList[0].empRoleId);
  //         localStorage.setItem("loginEmpRole",response.wrappedList[0].roleName);
  //         localStorage.setItem("state",response.wrappedList[0].state);
  //         localStorage.setItem("rmId",response.wrappedList[0].rmId);
  //         let tenentId = response.wrappedList[0].tenentId;
  //         localStorage.setItem("tenentId",window.btoa(tenentId));
  //         localStorage.setItem(btoa("isValidToken"),btoa(Constant.CREST_PRIVATE_KEY));
  //         this.router.navigate(['/layout']);
  //       }
  //       else if(response.responseCode === Constant.NO_RECORDS_FOUND_CODE){
  //         this.toastr.warning(response.responseDesc, 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       }
  //       else{
  //         this.toastr.warning('Invalid Login Credentials...', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       }
  // },
  //   (error)=>{
  //     this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.ShowLoading = false;
  //   })
  }

  openForgetPasswordModel(){
    if(this.loginModel.username == ""){
      // alert("enter employee id");
      this.toastr.warning("enter valid mobile no","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      return;
    }
    this.mobileNumber = this.loginModel.username;
    $("#forgetPasswordModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  sendOTP(){
    this.isOTP_Validate = false;
    this.validOTPNumber = "";
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber
    }
    this.ShowLoading = true;
    this.mainService.getService("sendOTP",json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.validOTPNumber = response.wrappedList[0];
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("sendOTPtoMobile"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  VerifyOTP(){
    this.isOTP_Validate = false;
    if(this.otpNumber != this.validOTPNumber){
      alert("enter enter valid otp");
      return;
    }
    this.isOTP_Validate = true;

  }

  changePassword(){
    if(this.newPassword == ""){
      alert("Enter new password");
      return ;
    }
    else if(this.confirmPassword != this.newPassword){
      alert("Password does not match, please re-enter.");
      return;
    }
    this.ShowLoading = true; 
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber,
      newPassword : this.newPassword
    }
    this.mainService.getService("changePassword",json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success('password change successfully', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          $("#forgetPasswordModal").modal("hide");
          this.otpNumber = "";
          this.mobileNumber = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.isOTP_Validate = false;
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changePassword"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  closeModal(){
    let isConfirm = confirm("Do you want to close?");
    if(isConfirm){
      this.mobileNumber = "";
      this.otpNumber = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.isOTP_Validate = false;
      $("#forgetPasswordModal").modal("hide");
    }
  }

}
