import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { Caching } from "@pnp/queryable";
import "@pnp/sp/search";

var _sp: SPFI = null;

export const getSP = (context?: ApplicationCustomizerContext | WebPartContext): SPFI => {
    if (_sp === null && context != null) {
        _sp = spfi().using(SPFx(context)).using(Caching({
            store: 'session'
        }));
    }
    return _sp;
};