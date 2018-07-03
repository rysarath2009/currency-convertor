import { Component, Input } from '@angular/core';
import { Conversion } from 'models/conversion';

@Component({
    selector: 'currency-convertor',
    templateUrl: './currency-convertor.component.html'
})
export class CurrencyConvertorComponent {
    @Input() fromDpDnId: string;
    @Input() toDpDnId: string;
    @Input() fromInput: string;
    @Input() toInput: string;

    public showDisclimer = false;
    public disclimerText = 'Currency Exchange rates are based on Fixer.io Api. Data is displayed \'as is\'.';
    public serviceFailureText = 'Unable to get response from Fixer';
    public toData: number;
    public fromData: number;

    public toDpdn: string;
    public fromDpDn: string;

    public dropdownItems = ['CAD', 'USD', 'EUR'];

    constructor(
        public conversionTo: Conversion) {
        this.toDpdn = 'USD';
        this.fromDpDn = 'CAD';
    }

    updateFromInputData = (event): void => {
        this.fromData = event.target.value;
        this.populateData();
    };

    getMultiplicationFactor(data) {
        let convFactor = 1;

        Object.keys(data).map((key) => {
            if (this.toDpdn === key) {
                convFactor = data[key];
                return;
            }
        });
        return convFactor;
    }
    populateDataKeyUp(event) {
        const value = event.target.value;

        let keycode = event.keyCode;
        if (keycode === 0) {
            keycode = event.charCode;
        }

        if ((event.shiftKey && keycode === 62) || (keycode === 48 && value === '0') ||
            (keycode === 46 && value.indexOf('.') >= 0) ||
            value.split('.')[1].length > 1) {
            if (keycode !== 8) {
                event.preventDefault();
            }
        }
    }

    populateData() {
        if (this.fromData) {
            let data;
            if (this.fromDpDn === 'CAD') {
                data = this.conversionTo.cadData;
            } else if (this.fromDpDn === 'USD') {
                data = this.conversionTo.usdData;
            } else {
                data = this.conversionTo.eurData;
            }
            const convFactor = this.getMultiplicationFactor(data);
            this.toData = Number((this.fromData * convFactor).toFixed(2));
        } else {
            this.toData = null;
        }
    }

    discliamerInvoked() {
        this.showDisclimer = !this.showDisclimer;
    }
}
