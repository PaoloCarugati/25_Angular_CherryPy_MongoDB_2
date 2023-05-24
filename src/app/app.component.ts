import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Disco } from './models/disco.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Integrazione - esempio con chiamate GET, POST, PUT e DELETE (Angular + CherryPy + MongoDB)';
  dischi: Disco[];
  obs: Observable<Disco[]>;
  URL: string = 'https://a419-188-152-102-12.ngrok-free.app';
  headers= new HttpHeaders().set('ngrok-skip-browser-warning', 'test')

  constructor(public client: HttpClient) {

  }

  ngOnInit(): void {
    this.makeGetRequest();
  }

  makeGetRequest(): void {
    this.obs = this.client.get<Disco[]>(this.URL + "/GET", {"headers": this.headers});
    //this.obs.subscribe(data => {this.dischi = data; alert("ok!")}, error => console.log("ERROR: " + error));
    this.obs.subscribe(data => this.dischi = data);
  }

  makePostRequest(): void {
/*
    this.client.post<Object>(this.URL + "/POST", 
      JSON.stringify({ "id": 5,
        "title": "Out of Time",
        "artist": "R.E.M.",
        "year": 1990,
        "company": "Sony"      
      }),
     {"headers": this.headers}).subscribe(d => this.makeGetRequest());
*/
    this.client.post<Object>(this.URL + "/POST", 
      {"headers": this.headers},
      {"params": { "id": 5,
      "title": "Out of Time",
      "artist": "R.E.M.",
      "year": 1990,
      "company": "Sony"      
    }}).subscribe(d => this.makeGetRequest());
  }
}
