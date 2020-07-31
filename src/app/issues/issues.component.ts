import { Component, OnInit } from '@angular/core';

import { Issue } from "../issue";
import { IssueService } from "../issue.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css', "../global.css" ]
})
export class IssuesComponent implements OnInit {

  issues: Issue[];

  constructor(
    private issueService: IssueService) {
  }

  fetchIssues(): void {
    // Fetch the stuff asynchronously! This won't always be mock data...
    this.issueService.getIssues().subscribe(
      issues => this.issues = issues
    );
  }

  add(text: string): void {
    text = text.trim();
    if (!text) { return; }
    this.issueService.addIssue({ text: text } as Issue)
      .subscribe(issue => {
        this.issues.push(issue);
      });
  }

  delete(issue: Issue): void {
    this.issues = this.issues.filter(i => i !== issue);
    // subscribe() is necessary, else the request is not sent!
    this.issueService.deleteIssue(issue).subscribe();
  }

  giveFck(givenIssue: Issue): void {
    let foundIssue: Issue = this.issues.find(issue => issue === givenIssue);
    foundIssue.fcks += 1;
    this.issueService.updateIssue(givenIssue).subscribe(() => null);;
  }

  /**
   * Lifecycle hook!
   */
  ngOnInit(): void {
    this.fetchIssues()
  }

}
