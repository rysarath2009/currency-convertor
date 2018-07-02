import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoute } from 'routes/home/home.route';

const routes: Routes = [
    {
        path: 'home',
        component: HomeRoute
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutedComponents = [HomeRoute];
