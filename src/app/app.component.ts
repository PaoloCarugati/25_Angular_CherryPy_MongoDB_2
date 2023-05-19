import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Integrazione - un esempio minimale (Angular + CherryPy + MongoDB)';
  data: Object;
  obs: Observable<Object>;
  URL: string = 'https://2a69-188-152-102-12.ngrok-free.app/GET';

  constructor(public client: HttpClient) {

  }

  ngOnInit(): void {
    const headers= new HttpHeaders().set('ngrok-skip-browser-warning', 'test')

    this.client.get(this.URL, {"headers": headers}).subscribe(d => { this.data = d }, err => { alert("Houston, abbiamo un problema...") });
  }
}
