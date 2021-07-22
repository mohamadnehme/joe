import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
          .pipe(
            catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                        if(error.status === 401){
                            if(error.error != null){
                                return throwError(error.error['title']);
                            }
                        }
                        const applicationError = error.headers.get("Application-Error");
                        if (applicationError) {
                            console.error(applicationError);
                            return throwError(applicationError);
                        }
                        const serverError = error.error;
                        let modelStateError = '';
                        if(serverError && typeof serverError === 'object'){
                            for(const key in serverError['errors']){
                                if(serverError['errors'][key]){
                                    modelStateError += serverError['errors'][key] + '\n';
                                }
                            }
                        }
                        return throwError(modelStateError || serverError || 'Server Error');
                    }
                })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}