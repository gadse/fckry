import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css', "../global.css" ]
})
export class DashboardComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues(): void {
    this.issueService
      .getIssues()
      .subscribe(issues => this.issues = issues.sort((a,b) => +(a.fcks <= b.fcks)).slice(0, 4));
  }
}