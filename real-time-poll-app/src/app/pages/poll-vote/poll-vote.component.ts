import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Poll, PollOption, PollService } from '../../services/poll.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 


@Component({
  selector: 'app-poll-vote',
  standalone: true,  
    imports: [
      CommonModule,
    MatButtonModule,
    NgxChartsModule,
    MatProgressSpinnerModule
    ],
    templateUrl: './poll-vote.component.html', 
    styleUrls: ['./poll-vote.component.css']    
})
export class PollVoteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pollService = inject(PollService);
  public shareableLink: string = window.location.href;

  poll$: Observable<Poll | null> | undefined;
  chartData: any[] = [];
  pollId: string = '';
window: any;

  ngOnInit(): void {
    this.poll$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.pollId = params.get('id')!;
        return this.pollService.getPoll(this.pollId);
      })
    );
    
    // Subscribe to update the chart data whenever the poll changes
    this.poll$?.subscribe(poll => {
      if (poll) {
        this.chartData = poll.options.map(option => ({
          name: option.text,
          value: option.votes
        }));
      }
    });
  }

  vote(options: PollOption[], optionIndex: number): void {
    this.pollService.vote(this.pollId, options, optionIndex);
  }
}