import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService],
    });

    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', () => {
    const mockConfig = {
      baseUrl: 'http://example.com',
      appName: 'TestApp',
      branding: {favicon: 'assets/test-favicon.ico'},
    };

    service.loadConfig().then(() => {
      expect(service.getBaseUrl()).toBe(mockConfig.baseUrl);
      expect(service.getAppName()).toBe(mockConfig.appName);
      expect(service.getFavicon()).toBe(mockConfig.branding.favicon);
    });

    const req = httpTestingController.expectOne('/assets/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
