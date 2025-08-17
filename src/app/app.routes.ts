import { Routes } from '@angular/router';
import { CreatePollComponent } from './pages/create-poll/create-poll.component';

export const routes: Routes = [
  { path: '', component: CreatePollComponent }, 
  {
    path: 'poll/:id',
    loadComponent: () => import('./pages/poll-vote/poll-vote.component').then(m => m.PollVoteComponent)
    
  },
  
];
