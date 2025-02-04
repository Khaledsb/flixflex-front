import GeneralSettings from '@/config/general';
import http from "@/config/http-common";

class FavoriteDataService {
    static baseURL = GeneralSettings.baseURL;

    static getAll(page: number): Promise<any> {
        return http.get(this.baseURL + `favorites`);
    }

    static get(id: string): Promise<any> {
       return http.get(this.baseURL + 'movies/show/'+ id);
    }

    static addToFavorite(movie_id: string, type: string): Promise<any> {
        return http.post(this.baseURL + 'favorites', {
            movie_id,
            type
        });
    }

    static removeFromFavorite(id: string): Promise<any> {
        return http.delete(this.baseURL + 'favorites/' + id);
    }
}

export default FavoriteDataService;
