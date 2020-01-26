import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from '../../services/users.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit() {
    this.initalForm();
  }

  initalForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email]
      ],
      password: ["",[Validators.required, Validators.minLength(4)]]
    });
  }

  onLoginHandler() {
    if (this.form.valid) {
      const {email , password} = this.form.value;
      this.userService.login(email , password).subscribe(state => {
        if (!state) {
          this.form.reset();
          alert("User of password is incurrect");
        }
      })
    }
  }

}
