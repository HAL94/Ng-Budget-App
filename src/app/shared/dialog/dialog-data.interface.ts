import { TemplateRef } from "@angular/core";

export interface DialogData {
    headerText: string;
    template: TemplateRef<any>;
    context?: any;
}

export interface DialogOptions {
    width: string;
    disableClose: boolean;
}