import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Pipe, PipeTransform} from '@angular/core';

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
    startDate = new Date();
    location = null;
    endDate = new Date(this.startDate.getTime() + (1000 * 60 * 60 * 24));

    constructor(private http: HttpClient) {
        function initialize() {
            var input = document.getElementById('searchTextField');
            new google.maps.places.Autocomplete(input);
        }

        google.maps.event.addDomListener(window, 'load', initialize);
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log(position)
            }, function() {
                console.log("error")
            });
        }
        this.getHotelsDeals();
    };

    round = function (num) {
        return Math.round(num);
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
            switch(this.priceOptions){
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

        this.loading = true;
        this.http.get("https://stark-eyrie-83089.herokuapp.com/hotels/deals", {params: params})
            .subscribe(data => {
                    this.offers = data["offers"]["Hotel"];
                    this.destination = data["offers"]["Hotel"][0]["destination"];
                    this.loading = false;
                },
                err => this.logError(err),
            );
    };

    onRatingChange = function () {
        this.getHotelsDeals();
    };

    replcaeImageLink = function (link) {
        return link.replace("_t", "_y");

    };

    logError(err: string) {
        console.error('There was an error: ' + err);
    };
}

declare var google;


