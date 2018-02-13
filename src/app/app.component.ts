import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateOrdinal',
  pure: false
})

export class rateOrdinalPipe implements PipeTransform {
  transform(items: Object, filter: Object): any {
    if (!items && !filter) {
      return items;
    }

    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (items >= 4.7){
      return "Exceptional!";
    }
    if (items >= 4.5){
      return "Wonderful!";
    }

    if (items >= 4.3){
      return "Excellent!";
    }

    if (items >= 4){
      return "Very Good!";
    }

    if (items >= 3.5){
      return "Good!";
    }

    return "";
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


@Injectable()
export class AppComponent {
  offers = []
  response = {
    offers: []
  };

  constructor(private http: HttpClient) {
    this.http.get("https://stark-eyrie-83089.herokuapp.com/hotels/deals")
        .subscribe(data => {
          this.offers = data["offers"]["Hotel"]
        },
            err => this.logError(err),
        );
  };

  round = function(num){
    return Math.round(num);
};

  title = 'app';

  logError(err: string) {
    console.error('There was an error: ' + err);
  }
}

