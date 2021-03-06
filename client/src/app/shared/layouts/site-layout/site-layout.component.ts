import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {
  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Products'}
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
