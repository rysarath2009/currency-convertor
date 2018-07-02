import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'config/globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurrencyConvertorService {

    constructor(
        public http: HttpClient
    ) { }


    getConversionRate() {
        return this.http
            .get(CONFIG.authUrl + '/convertor')
            .toPromise();
    }

}
