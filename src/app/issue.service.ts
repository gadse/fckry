import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Issue } from "./issue";
import { ISSUES } from "./mock-data";

import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // "root": Single, shared instance shared across the app!
})
export class IssueService {

  private issuesUrl = 'api/issues';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService, 
    private http: HttpClient) { }

  /** GET issues from the server */
  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issuesUrl).pipe(
      tap(_ => this.log('fetched issues')),
      catchError(this.handleError<Issue[]>('getIssues', []))
    )
  }

  getIssue(id: number): Observable<Issue> {
    // TODO: send the message _after_ fetching the issue
    this.messageService.add(`IssudService: fetched issue id=${id}`);
    return of(
      // Searches the array
      ISSUES.find(
        issue => issue.id === id
      ));
  }

  /** PUT: update the issue on the server */
  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(this.issuesUrl, issue, this.httpOptions).pipe(
      tap(_ => this.log(`updated issue id=${issue.id}`)),
      catchError(this.handleError<any>('updateIssue'))
    );
  }

  /** POST: add a new issue to the server */
  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.issuesUrl, issue, this.httpOptions).pipe(
      tap((newIssue: Issue) => this.log(`added issue w/ id=${newIssue.id}`)),
      catchError(this.handleError<Issue>('addIssue'))
    );
  }

  /** DELETE: delete the issue from the server */
  deleteIssue(issue: Issue | number): Observable<Issue> {
    const id = typeof issue === 'number' ? issue : issue.id;
    const url = `${this.issuesUrl}/${id}`;

    return this.http.delete<Issue>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted issue id=${id}`)),
      catchError(this.handleError<Issue>('deleteIssue'))
    );
  }

  /* GET issuees whose name contains search term */
  searchIssues(term: string): Observable<Issue[]> {
    if (!term.trim()) {
      // if not search term, return empty issue array.
      return of([]);
    }
    return this.http.get<Issue[]>(`${this.issuesUrl}/?text=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found issuees matching "${term}"`) :
        this.log(`no issuees matching "${term}"`)),
      catchError(this.handleError<Issue[]>('searchIssues', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    // Function is anonymous!
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    this.messageService.add(`IssueService: ${message}`);
  }
}
