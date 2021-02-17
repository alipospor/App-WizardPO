import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BackendConfigArgs, getBackendService, setupBackend } from 'web-backend-api';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
    enableProdMode();
}

declare const require: any;

// Then we find all the mocks.
const context = require.context('../backend/', true, /\.data\.ts$/);
// And load the modules.
context.keys().map(context);

const config: BackendConfigArgs = {
    post204: false, // return the item in body after POST
    put204: false, // return the item in body after PUT
    pageEncapsulation: false,
    postsToOtherMethod: [
        {
            otherMethod: 'PUT',
            applyTo: 'urlSegment',
            value: 'alterar'
        },
        {
            otherMethod: 'PUT',
            applyTo: 'urlSegment',
            value: 'editar'
        },
        {
            otherMethod: 'DELETE',
            applyTo: 'urlSegment',
            value: 'excluir'
        },
        {
            otherMethod: 'DELETE',
            applyTo: 'urlSegment',
            value: 'deletar'
        },
    ],
};
setupBackend(config, { dbtype: 'indexdb' }).then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule).then(
        () => {
            console.log(getBackendService());
            console.log('[Backend]', 'Backend database application started!');
        }
    ).catch(err => console.error(err));
}).catch(err => console.error(err));
