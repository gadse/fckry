import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IssueService }  from '../issue.service';
import { Issue } from "../issue";

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  @Input() issue: Issue;

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private location: Location) { }

  ngOnInit(): void {
    this.fetchIssue();
  }

  save(): void {
    this.issueService.updateIssue(this.issue)
    .subscribe(() => this.goBack());
  }

  fetchIssue(): void {
    /* "+" operator is JS insanity for "make this a number"
     * "paramMap" contains all inserted parameters.
    */
    const id = +this.route.snapshot.paramMap.get('id');
    this.issueService.getIssue(id)
      .subscribe(issue => this.issue = issue);
  }

  goBack(): void {
    this.location.back();
  }

}
