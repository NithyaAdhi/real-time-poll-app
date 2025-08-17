import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PollService } from '../../services/poll.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-create-poll',
  standalone: true,  
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './create-poll.component.html', 
  styleUrls: ['./create-poll.component.css']    
})
export class CreatePollComponent {
  private fb = inject(FormBuilder);
  private pollService = inject(PollService);
  private router = inject(Router);

  pollForm = this.fb.group({
    question: ['', Validators.required],
    options: this.fb.array([
      this.fb.control('', Validators.required),
      this.fb.control('', Validators.required)
    ])
  });

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  async onSubmit(): Promise<void> {
    if (this.pollForm.invalid) return;

    const formValue = this.pollForm.value;
    const pollId = await this.pollService.createPoll({
      question: formValue.question!,
      options: formValue.options! as string[]
    });

    // Navigate to the results page for the new poll

this.router.navigate(['/poll', pollId]); 
  }
}
