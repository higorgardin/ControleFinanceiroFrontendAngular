import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  signUpForm: FormGroup;

  isProcessingSignIn = false;

  isProcessingSignUp = false;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  serverErrorMessages = [
    'Falha na comunicação com o servidor, por favor tente mais tarde',
  ];

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      dsEmail: [null, [Validators.required]],
      dsPassword: [null, [Validators.required]],
    });

    this.signUpForm = this.formBuilder.group({
      dsName: [
        null,
        [Validators.required, Validators.email, Validators.minLength(2)],
      ],
      dsEmail: [null, [Validators.required, Validators.minLength(2)]],
      stDeleteAccount: [null],
    });
  }

  openSignUpModal(content) {
    this.modalService.open(content, {
      centered: true,
      beforeDismiss: () => this.beforeDismissModal(),
    });
  }

  beforeDismissModal() {
    return !this.isProcessingSignUp;
  }

  signIn() {
    this.isProcessingSignIn = true;
    console.log(this.loginForm.getRawValue());

    setTimeout(() => {
      this.isProcessingSignIn = false;
      this.router.navigate(['/app/reports']);
    }, 2000);
  }

  signUp(modalRef: NgbActiveModal) {
    this.isProcessingSignUp = true;

    setTimeout(() => {
      modalRef.close('Close click');
      this.isProcessingSignUp = false;
    }, 2000);

    console.log(this.signUpForm.getRawValue());
  }
}
