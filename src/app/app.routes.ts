import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { NotFoundComponent } from './navegation/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path:'products', component: ProductsComponent},
    {path: 'suppliers', component: SuppliersComponent},
    {
        path: 'account',
        loadChildren: () => import('./account/account.routes').then(feature => feature.AccountRoutes)
    },

    {path: '**', component: NotFoundComponent}
];
