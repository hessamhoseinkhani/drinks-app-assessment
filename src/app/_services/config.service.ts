import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {
  }

  loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json').toPromise()
      .then((config) => {
        this.config = config;
      });
  }

  getBaseUrl(): string {
    return this.config?.baseUrl || '';
  }

  getAppName(): string {
    return this.config?.appName || 'DefaultAppName';
  }

  getFavicon(): string {
    return this.config?.branding?.favicon || 'assets/default-favicon.ico';
  }
}
