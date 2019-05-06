import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'product',
                loadChildren: './product/product.module#LogisticProductModule'
            },
            {
                path: 'product-type',
                loadChildren: './product-type/product-type.module#LogisticProductTypeModule'
            },
            {
                path: 'provider',
                loadChildren: './provider/provider.module#LogisticProviderModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticEntityModule {}
