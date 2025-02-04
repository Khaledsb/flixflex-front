import GeneralSettings from '@/config/general';
import http from "@/config/http-common";

class MovieDataService {
    static baseURL = GeneralSettings.baseURL;

    static getAll(page: number): Promise<any> {
        return http.get(this.baseURL + `movies?page=${page}`);
    }

    static get(id: string): Promise<any> {
       return http.get(this.baseURL + 'movies/show/'+ id);
    }
}

export default MovieDataService;
