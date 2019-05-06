import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProvider } from 'app/shared/model/provider.model';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-provider-update',
    templateUrl: './provider-update.component.html'
})
export class ProviderUpdateComponent implements OnInit {
    provider: IProvider;
    isSaving: boolean;

    constructor(protected providerService: ProviderService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ provider }) => {
            this.provider = provider;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.provider.id !== undefined) {
            this.subscribeToSaveResponse(this.providerService.update(this.provider));
        } else {
            this.subscribeToSaveResponse(this.providerService.create(this.provider));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvider>>) {
        result.subscribe((res: HttpResponse<IProvider>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
