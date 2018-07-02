import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutedComponents } from './routes/app.routes';

/* Models */
import { Conversion } from './models/conversion';

/* Components */
import { AppComponent } from './app.component';
import { CurrencyConvertorComponent } from './components/currency-convertor/currency-convertor.component';

/* Services */
import { CurrencyConvertorService } from 'services/currencyconvertor.service';

/* Directives */
import { OnlyNumber } from './directives/onlynumbers.directive';

@NgModule({
    declarations: [
        AppComponent,
        CurrencyConvertorComponent,
        RoutedComponents,
        OnlyNumber
    ],
    entryComponents: [],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        CurrencyConvertorService,
        Conversion
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
