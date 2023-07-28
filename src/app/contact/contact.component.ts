import { Component, SkipSelf, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { contact } from '../interface/contact.interface';
import { Subscription } from 'rxjs';

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

  constructor(@SkipSelf() private contactService: ContactService) { }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  onEmailSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid)
      return;

    const data: contact = {
      name: this.nameInput!.value as string,
      email: this.emailInput!.value as string,
      message: this.messageInput!.value as string
    };

    // send email
    this.isSending = true;
    this.subscription = this.contactService.sendEmail(data).subscribe({
      error: (e) => {
        console.error(e);
        this.isSending = false;
      },
      complete: () => {
        showToast(this.toastId);
        this.isSending = false;
      }
    });
  }

}
