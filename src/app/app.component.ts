import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {Http, Response, HttpModule} from '@angular/http';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  selectedValueTitle; selectedValueState: String;

  States = [
    {value: 'Open', viewValue: 'Open'},
    {value: 'Close', viewValue: 'Close'}
  ];

  Titles = [
    {value: 'MdSort', viewValue: 'MdSort'},
    {value: 'Sizing icon buttons', viewValue: 'Sizing icon buttons'}
  ];

  displayedColumns = ['number', 'state', 'title'];
  exampleDatabase: ExampleHttpDatabase | null;
  dataSource: ExampleDataSource | null;

  dropdata = [];
  
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filterInput: ElementRef;
  @ViewChild('selectstate') selectstate: ElementRef;
  @ViewChild(MdSort) sort: MdSort;

  constructor(http: Http) {
    this.exampleDatabase = new ExampleHttpDatabase(http, this);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
  }

  ngOnInit() {

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filterInput.nativeElement.value;
        });

  }

  mostrardatos($ele){
    this.dataSource._filterChange.next($ele.value)
    this.dataSource.allData.next($ele.source.ariaLabel);
    if($ele.source.ariaLabel=='state'){
      this.selectedValueTitle = '';
    } else {
      this.selectedValueState = '';
    }
  }
}

export interface MyGithubIssue {
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {

  private issuesUrl = 'http://localhost:4200/assets/data.json';  // URL to web API

  getRepoIssues(): Observable<MyGithubIssue[]> {
    return this.http.get(this.issuesUrl).map(this.extractData)
                    
  }
  
  extractData(result: Response): MyGithubIssue[] {
    return result.json().map(issue => {
      return {
        number: issue.number,
        state: issue.state,
        title: issue.title,
      }
    });
  }

  dataChange: BehaviorSubject<MyGithubIssue[]> = new BehaviorSubject<MyGithubIssue[]>([]);
  get data(): MyGithubIssue[] { return this.dataChange.value; }
  
  constructor(private http: Http, private _appComponent: AppComponent) {
    this.getRepoIssues()
            .subscribe(data => this.dataChange.next(data));
  }

}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleHttpDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

 
export class ExampleDataSource extends DataSource<MyGithubIssue> {

  allData = <BehaviorSubject<MyGithubIssue[]>> new BehaviorSubject(new Array<MyGithubIssue>());

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }


  filteredData: MyGithubIssue[] = [];
  renderedData: MyGithubIssue[] = [];

  constructor(private _exampleDatabase: ExampleHttpDatabase, private _paginator: MdPaginator, private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MyGithubIssue[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this.allData,
      this._filterChange,
      this._sort.mdSortChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges).map(() => {
    
        let searchStr = this.allData.value.toString();
        let searchStr2: String;

        this.filteredData  = this._exampleDatabase.data.slice().filter((item: MyGithubIssue) => {
        
        if(searchStr === 'state'){
          searchStr2 = (item.state).toLowerCase();
        } else {
          searchStr2 = (item.title).toLowerCase();
        }
        
        console.log(searchStr)
        
        return searchStr2.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.getSortedData(this.filteredData.slice()) // this.droppeddata.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize)
      return this.renderedData;
    });
    
  }

  disconnect() {}

   /** Returns a sorted copy of the database data. */
  getSortedData(data: MyGithubIssue[]): MyGithubIssue[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

}