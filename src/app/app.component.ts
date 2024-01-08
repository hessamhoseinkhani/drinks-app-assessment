import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {ConfigService} from "./_services/config.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  appName: string = 'DefaultAppName';
  logo: string = 'assets/default-logos.png';

  constructor(private titleService: Title, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.loadConfig().then(() => {
      this.appName = this.configService.getAppName();
      this.titleService.setTitle(this.appName);
      this.setFavicon();
    });
  }

  private setFavicon(): void {
    const faviconLink = document.getElementById('favicon') as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = this.configService.getFavicon();
    }
  }
}
