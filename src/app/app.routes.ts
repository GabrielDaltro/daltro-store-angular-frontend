import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NotFoundComponent } from './components/navegation/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path:'products', component: ProductsComponent},
    {path: 'suppliers', component: SuppliersComponent},
    {
        path: 'account',
        loadChildren: () => import('./components/account/account.routes').then(feature => feature.AccountRoutes)
    },

    {path: '**', component: NotFoundComponent}
];
