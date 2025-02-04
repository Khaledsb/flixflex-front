//import http from '@/config/http-common';
import GeneralSettings from '@/config/general';
import axios  from 'axios';
import http from "@/config/http-common";

class AccountDataService {
    static refreshing = false;
    static baseURL = GeneralSettings.baseURL;

    static login(username: string, password: string): Promise<any> {
        return http.post(this.baseURL + 'login', {
            username,
            password,
        });
    }

    static register(username: string, email: string, password: string): Promise<any> {
        return http.post(this.baseURL + 'register', {
            username,
            email,
            password
        });
    }
    static logout(token: string | null): Promise<any> {
        return http.post(this.baseURL + 'logout');
    }
}

export default AccountDataService;
