import { Injectable } from '@angular/core';

@Injectable()
export class Conversion {
    public inValidResponse = true;
    public eurData: any = null;
    public usdData: any = null;
    public cadData: any = null;

    constructor() {
    }

    setInValidResponse(inValidResponse: any) {
        if (inValidResponse) {
            this.inValidResponse = inValidResponse;
        } else {
            this.inValidResponse = null;
        }
    }

    setEurData(eurData: any) {
        if (eurData) {
            this.eurData = eurData;
        } else {
            this.eurData = null;
        }
    }

    setUsdData(usdData: any) {
        if (usdData) {
            this.usdData = usdData;
        } else {
            this.usdData = null;
        }
    }

    setCadData(cadData: any) {
        if (cadData) {
            this.cadData = cadData;
        } else {
            this.cadData = null;
        }
    }
}
