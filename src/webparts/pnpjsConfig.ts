import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";

let _sp: SPFI;

export const getSP = (): SPFI => {
  return _sp;
};

export const setupSP = (context: WebPartContext): void => {
  _sp = spfi().using(SPFx(context));
};
