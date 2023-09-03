import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule,
     MatInputModule, 
     MatCardModule, 
     ReactiveFormsModule,
     MatButtonModule,
    MatDividerModule, 
     MatIconModule,],
})
export class LoginComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private service:AuthService,private router:Router) {

  } 
  userdata:any;


  loginform=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  })


  proceedlogin(){
    if(this.loginform.valid) {
  this.service.Getbycode(this.loginform.value.username).subscribe(res=>{
    this.userdata=res;
    console.log(this.userdata);
    if(this.userdata.password===this.loginform.value.password){
      if(this.userdata.isactive){
        sessionStorage.setItem('username', this.userdata.id);
        sessionStorage.setItem('userrole', this.userdata.role);
        

      }else{
        this.toastr.error('Login não autorizado','login autorizado');
      }
  
  
  
  
      }else{
  this.toastr.error('Email ou Senha incorretos');
}
  });
    }
  }
}
