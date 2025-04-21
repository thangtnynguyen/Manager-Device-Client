import { environment } from "src/environments/environment";

export const app = {
    baseApiUrl: environment.baseApiUrl || '',
    apiUrl: environment.apiUrl || '',
};
