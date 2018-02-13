import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import {rateOrdinalPipe} from './app.component'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    rateOrdinalPipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDu9o67T-7gIkQ1N_p9WoLtfjjA1FKJPno",
      libraries: ["places"]
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
