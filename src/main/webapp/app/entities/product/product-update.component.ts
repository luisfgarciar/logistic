import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { IProvider } from 'app/shared/model/provider.model';
import { ProviderService } from 'app/entities/provider';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    producttypes: IProductType[];

    providers: IProvider[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected productTypeService: ProductTypeService,
        protected providerService: ProviderService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.productTypeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductType[]>) => response.body)
            )
            .subscribe((res: IProductType[]) => (this.producttypes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.providerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProvider[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProvider[]>) => response.body)
            )
            .subscribe((res: IProvider[]) => (this.providers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
        result.subscribe((res: HttpResponse<IProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.id;
    }

    trackProviderById(index: number, item: IProvider) {
        return item.id;
    }
}
