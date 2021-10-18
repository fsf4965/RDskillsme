import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackFile } from 'src/app/models/feedback_file.model';
import { FeedbackFileService } from 'src/app/services/feedback_file.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  //get the current my dev_pro id from the my-dev-project-detail component
  @Input()
  currentDev_ProjectID!:number
  
  showFeedback = false;
  feedbackUploads!: Observable<FeedbackFile[]>;

  constructor(private feedbackService: FeedbackFileService) { }

  ngOnInit() {
  }

  showFeedbacks(enable: boolean) {
    this.showFeedback = enable;

    if (enable) {
      this.feedbackUploads = this.feedbackService.getFilesbyDevID(this.currentDev_ProjectID);
    }
  }
}

