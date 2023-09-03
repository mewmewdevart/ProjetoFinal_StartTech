import {Component} from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private service:AuthService,private router:Router) {

  } 

  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('' ,Validators.required),
    password:this.builder.control('' ,Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:this.builder.control('' ,Validators.compose([Validators.required,Validators.email]) ),
    gender:this.builder.control('male' ,),
    role:this.builder.control('' ,),
    isactive:this.builder.control(false)
  });

  proceedregisteration(){
    if(this.registerform.valid){
    this.service.Proceedregister(this.registerform.value).subscribe(res=>{
    this.toastr.success('Criando Conta','Cadastro Concluido');
    this.router.navigate(['login']);
    });
    }else{
this.toastr.warning('Por favor insira dados válidos.')
    }
  }

}
