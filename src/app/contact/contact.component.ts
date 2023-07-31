import { Component, SkipSelf, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmailService } from '../services/email.service';
import { email } from '../interface/email.interface';

declare function showToast(toastId: string): void;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnDestroy {

  subscription!: Subscription;
  submitted: boolean = false;
  toastId: string = 'emailToast';
  isSending: boolean = false;

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  nameInput = this.contactForm.get('name');
  emailInput = this.contactForm.get('email');
  messageInput = this.contactForm.get('message');

  constructor(@SkipSelf() private emailService: EmailService) { }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  onEmailSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid)
      return;

    const data: email = {
      name: this.nameInput!.value as string,
      email: this.emailInput!.value as string,
      message: this.messageInput!.value as string
    };

    // send email
    this.isSending = true;
    this.subscription = this.emailService.sendEmail(data).subscribe({
      error: (e) => {
        console.error(e);
        this.isSending = false;
        this.contactForm.reset();
      },
      complete: () => {
        showToast(this.toastId);
        this.isSending = false;
        this.contactForm.reset();
      }
    });
  }

}
