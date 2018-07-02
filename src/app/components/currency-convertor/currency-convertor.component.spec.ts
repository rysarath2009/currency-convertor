/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CurrencyConvertorComponent } from './currency-convertor.component';
import { Conversion } from 'models/conversion';

describe('CurrencyConvertorComponent', () => {
    let component: CurrencyConvertorComponent;
    let fixture: ComponentFixture<CurrencyConvertorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CurrencyConvertorComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [Conversion]
        }).compileComponents();

        fixture = TestBed.createComponent(CurrencyConvertorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should pass discliamerInvoked', () => {
        component.discliamerInvoked();
    });

    it('should pass populateData', () => {
        component.fromData = 1;
        component.fromDpDn = 'CAD';
        component.conversionTo.cadData = {
            CAD: 1,
            EUR: 0.65,
            USD: 0.86
        };
        component.toDpdn = 'USD';
        component.populateData();
    });
});
