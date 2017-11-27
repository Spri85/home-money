import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'spr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
    ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      { name: 'keywords', content: 'логин,входбсистема'},
      { name: 'description', content: 'Страница для входа в систему'},
    ])
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      if ( params['nowCanLogin'] ) {
        this.showMessage({
          text: 'Now you can enter to system',
          type:  'success'
        });
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'You should login to work with system',
          type:  'warning'
        });
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showMessage(message: Message) {
  this.message = message;
  window.setTimeout(() => {
    this.message.text = '';
  }, 5000);
  }
  onSubmit() {
  const formData = this.form.value;

  this.userService.getUserByEmail(formData.email)
    .subscribe((user: User) => {
    if (user) {
      if (user.password === formData.password) {
        // logic
        this.message.text = '';
        window.localStorage.setItem('user', JSON.stringify(user));
        this.authService.login();
        this.router.navigate(['/system', 'bill']);

      } else {
        this.showMessage({
          text: 'Passvord is incorrect',
          type: 'danger'
        });
      }
    } else {
      this.showMessage({
        text: 'User no found',
        type: 'danger'
      });
    }
    });
  }

}
