import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from './product-type.service';

@Component({
    selector: 'jhi-product-type-update',
    templateUrl: './product-type-update.component.html'
})
export class ProductTypeUpdateComponent implements OnInit {
    productType: IProductType;
    isSaving: boolean;

    constructor(protected productTypeService: ProductTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productType }) => {
            this.productType = productType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productType.id !== undefined) {
            this.subscribeToSaveResponse(this.productTypeService.update(this.productType));
        } else {
            this.subscribeToSaveResponse(this.productTypeService.create(this.productType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductType>>) {
        result.subscribe((res: HttpResponse<IProductType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
