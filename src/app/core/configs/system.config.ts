import { environment } from 'src/environments/environment';

const systemConfig = {
    baseUrl: environment.baseApiUrl ?? '',
    baseFileSystemUrl: environment.baseApiUrl ?? '',
};

export default systemConfig;
