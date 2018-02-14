import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Pipe, PipeTransform} from '@angular/core';
// import * as $ from 'jquery';

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
        if (items >= 4.7) {
            return "Exceptional!";
        }
        if (items >= 4.5) {
            return "Wonderful!";
        }

        if (items >= 4.3) {
            return "Excellent!";
        }

        if (items >= 4) {
            return "Very Good!";
        }

        if (items >= 3.5) {
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
    offers = [];
    destination = {};
    guestRating = null;
    starRating = null;
    priceOptions = null;
    loading = true;
    startDate = moment().add(1, 'days');
    endDate = moment().add(2, 'days');
    location = null;
    previousLocation = null;

    constructor(private http: HttpClient) {
        let initialize = ()=> {
            let input = document.getElementById('searchTextField');
            new google.maps.places.Autocomplete(input);
            $('input[name="daterange"]').daterangepicker({
                locale: {
                    format: 'YYYY-MM-DD'
                },
                startDate: this.startDate,
                endDate: this.endDate,
                minDate: this.startDate
            }, (start, end) => {
                console.log(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
                this.startDate = start;
                this.endDate = end;
                setTimeout(() => {
                    this.getHotelsDeals();
                }, 100);

            });
        };

        google.maps.event.addDomListener(window, 'load', initialize);
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }, function () {
                console.log("error")
            });
        }
        this.getHotelsDeals();
    };

    getHotelsDeals = function () {
        let params = new HttpParams();

        if (this.location) {
            params = params.append('destinationName', this.location);
        }

        if (this.guestRating) {
            params = params.append('minGuestRating', this.guestRating);
        }

        if (this.starRating) {
            params = params.append('minStarRating', this.starRating);
        }
        if (this.priceOptions) {
            switch (this.priceOptions) {
                case 1:
                    params = params.append('maxAverageRate', "74");
                    break;
                case  2:
                    params = params.append('minAverageRate', "75");
                    params = params.append('maxAverageRate', "124");
                    break;
                case  3:
                    params = params.append('minAverageRate', "125");
                    params = params.append('maxAverageRate', "199");
                    break;
                case  4:
                    params = params.append('minAverageRate', "200");
                    params = params.append('maxAverageRate', "299");
                    break;
                case  5:
                    params = params.append('minAverageRate', "300");
                    break;
            }
        }

        if (this.startDate) {
            params = params.append('minTripStartDate', this.startDate.format("YYYY-MM-DD"));
        }

        if (this.endDate) {
            var duration = moment.duration(this.endDate.diff(this.startDate));
            var lengthOfStay = Math.floor(this.endDate.diff(this.startDate)/(3600000*24))+1+"";
            params = params.append('lengthOfStay', lengthOfStay);
        }


        this.loading = true;
        this.previousLocation = this.location;
        this.http.get("https://stark-eyrie-83089.herokuapp.com/hotels/deals", {params: params})
            .subscribe(data => {
                    this.offers = data["offers"]["Hotel"];
                    // this.destination = data["offers"]["Hotel"][0]["destination"];
                    this.loading = false;
                },
                err => this.logError(err),
            );
    };

    /**
     * When a rating changes, we trigger the search
     */
    onRatingChange = function () {
        this.getHotelsDeals();
    };

    /**
     * When a location changes, we trigger the search
     */
    onLocationChanged = function () {
        setTimeout(() => {
            if (document.getElementById("searchTextField")) {
                this.location = (<HTMLInputElement>document.getElementById("searchTextField")).value;
            }
            if (this.previousLocation != this.location) {
                this.getHotelsDeals();

            }

        }, 100);
    };

    /**
     * I have noticed that images returned from the API have low resolution, then I digged more and discoverd that
     * when I replace _t with _y in the image url I get an image with better resolution
     * @param link
     * @returns {string|void}
     */
    replcaeImageLink = function (link) {
        return link.replace("_t", "_y");
    };

    /**
     * get array of size n
     *
     * @param num
     * @returns {Array}
     */
    getArray = function (num) {
      let arr= [];
      num = +num;
      for(let i = 0; i<num; i++){
          arr.push(i);
      }

      return arr;
    };

    /**
     * decode the url to be used
     * @param url
     * @returns {string}
     */
    decodeURL = function (url) {
        return decodeURIComponent(url);
    };

    round = function (num) {
        return Math.round(num);
    };

    logError(err: string) {
        console.error('There was an error: ' + err);
    };
}

declare var google;
declare var $;
declare var moment;


