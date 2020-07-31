import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Issue } from './issue';
import { ISSUES } from "./mock-data";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const issues = ISSUES;
    return {issues: issues};
  }

  // Overrides the genId method to ensure that a issue always has an id.
  // If the issues array is empty,
  // the method below returns the initial number (11).
  // if the issues array is not empty, the method below returns the highest
  // issue id + 1.
  genId(issues: Issue[]): number {
    if (issues.length > 0) { 
      return Math.max(...issues.map(issue => issue.id)) + 1 
    } else {
      return 11;
    }
  }
}