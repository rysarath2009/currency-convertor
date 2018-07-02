import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyConvertorService } from 'services/currencyconvertor.service';
import { Conversion } from 'models/conversion';

@Component({
    selector: 'home',
    templateUrl: './home.route.html'
})
export class HomeRoute implements OnInit {
    public loading = true;

    constructor(
        public router: Router,
        public conversionTo: Conversion,
        public currencyConvertorService: CurrencyConvertorService) {

    }

    ngOnInit(): void {
        this.currencyConvertorService.getConversionRate().
            then(response => this.handleSuccess(response))
            .catch(error => this.handleFailure(error));
    }

    handleSuccess(response) {
        if (response.success) {
            this.conversionTo.setEurData(response.rates);
            const usdData = {
                CAD: 0,
                EUR: 0,
                USD: 1
            };

            usdData.EUR = Number((1 / response.rates.USD).toFixed(6));
            usdData.CAD = Number((response.rates.CAD / response.rates.USD).toFixed(6));
            this.conversionTo.setUsdData(usdData);

            const cadData = {
                CAD: 1,
                EUR: 0,
                USD: 0
            };

            cadData.EUR = Number((1 / response.rates.CAD).toFixed(6));
            cadData.USD = Number((response.rates.USD / response.rates.CAD).toFixed(6));
            this.conversionTo.setCadData(cadData);
            this.conversionTo.setInValidResponse(false);
            this.loading = false;
        } else {
            this.handleFailure(response);
        }
    }

    handleFailure(error) {
        this.loading = false;
    }
}
