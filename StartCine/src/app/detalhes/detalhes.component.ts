import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit  {

  filmeId: string;
  filme: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filmeId = params.get('id') ?? '';
      this.http.get<any>('http://localhost:3000/filmes/' + this.filmeId).subscribe(data => {
        this.filme = data;
      });
    });
  }
}
