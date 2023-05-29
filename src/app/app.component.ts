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
  title = 'Integrazione - esempio con chiamate GET, POST, PUT e DELETE (Angular + CherryPy + MongoDB/SQL Server)';
  dischi: Disco[];
  obs: Observable<Disco[]>;
  id: string;
  //ATTENZIONE: l'url deve finire con lo slash (ovvero: /)
  URL: string = 'https://87e6-188-152-102-12.ngrok-free.app/';
  headers= new HttpHeaders().set('ngrok-skip-browser-warning', 'test').set('Content-Type', 'application/json');

  constructor(public client: HttpClient) {

  }

  ngOnInit(): void {
    this.makeGetRequest();
  }

  makeGetRequest(): void {
    this.obs = this.client.get<Disco[]>(this.URL + "GET", {headers: this.headers});
    this.obs.subscribe(
      data => {
        this.dischi = data; 
        //alert("ok!")
        //alert("N. record: " + this.dischi.length);
        //alert(this.dischi[0].artist);
      }, 
      error => alert (error));
  }

  makePostRequest(): void {
    this.client.post<Object>(this.URL + "POST", 
      JSON.stringify({ "id": 5,
        "title": "Out of Time",
        "artist": "R.E.M.",
        "year": 1990,
        "company": "Sony"      
      }),
      {"headers": this.headers}).subscribe(
      d => this.makeGetRequest(), 
      err => console.log(err));
  }

  makePutRequest(): void {
    this.client.put<Object>(this.URL + "PUT", 
      JSON.stringify({ "id": 5,
        "title": "Out of Time",
        "artist": "R.E.M.",
        "year": 2012,
        "company": "La Voce del Padrone"      
      }),
      {"headers": this.headers}).subscribe(
        d => this.makeGetRequest(), 
        err => console.log(err));
  }


  makePutRequestSQL(): void {
    this.id = prompt("Inserire l'Id del record da modificare");
    if (!isNaN(parseInt(this.id))) {
      this.client.put<Object>(this.URL + "PUT/" + this.id, 
        JSON.stringify({ 
          "title": "Out of Time",
          "artist": "R.E.M.",
          "year": 2012,
          "company": "La Voce del Padrone"      
        }),
        {"headers": this.headers}).subscribe(
          d => this.makeGetRequest(), 
          err => console.log(err));
    }
  }



  makeDeleteRequest(): void {
    this.id = prompt("Inserisci l'id del record da eliminare");
    if (!isNaN(parseInt(this.id))) {
      this.client.delete<Object>(this.URL + "DELETE/" + this.id,
      {"headers": this.headers}).subscribe(
        d => this.makeGetRequest(), 
        err => console.log(err));    
    }
  }
}
