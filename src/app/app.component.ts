import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
        this.router.navigateByUrl('/home');
    }
}
