import { Component } from '@angular/core';

@Component({
  selector: 'app-home-externa',
  templateUrl: './home-externa.component.html',
  styleUrls: ['./home-externa.component.scss']
})
export class HomeExternaComponent {

  
  nome: string = 'lucas';

  destaques: Array<any> = [
    
      { id: 1, titulo: 'stranger things', foto: 'https://i.ibb.co/55dP6zj/stranger.jpg' },
      { id: 2, titulo: 'riverdale', foto: 'https://i.ibb.co/pWNyd0k/riverdale.jpg' },
      { id: 3, titulo: 'society', foto: 'https://i.ibb.co/9tbfDmh/thesociety.jpg' },
      { id: 4, titulo: 'outer banks', foto: 'https://i.ibb.co/kmRJKfS/outerbancks.jpg' },
      { id: 5, titulo: 'locke key', foto: 'https://i.ibb.co/zVcyQjw/lock-key.jpg' },
      { id: 6, titulo: 'the umbrella academy', foto: 'https://i.ibb.co/chCrXpq/umbrella.jpg' },
    
  ];
  displayedDestaques: any[] = [];
  currentIndex = 0;
  batchSize = 3;

  ngOnInit() {
    this.updateDisplayedDestaques();
  }

  updateDisplayedDestaques() {
    this.displayedDestaques = this.destaques.slice(this.currentIndex, this.currentIndex + this.batchSize);
  }

  next() {
    if (this.currentIndex + this.batchSize < this.destaques.length) {
      this.currentIndex += this.batchSize;
      this.updateDisplayedDestaques();
    }
  }

  prev() {
    if (this.currentIndex - this.batchSize >= 0) {
      this.currentIndex -= this.batchSize;
      this.updateDisplayedDestaques();
    }
  }
  
 

}

