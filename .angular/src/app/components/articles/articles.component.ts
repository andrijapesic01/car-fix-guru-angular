import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles: Article[] = [
    { id: "1", carID: "CAR1", headline: "Oil change Audi A6 C7 (4G)", paragraphs: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "Paragraph 2", "Paragraph 3"], imgURLs: [""], tools: "", 
      parts:"", tags: "#oilchange #filter #oil" },
    { id: "2", carID: "CAR2", headline: "BMW M57 Engine timing fix", paragraphs: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "Paragraph 2", "Paragraph 3"], imgURLs: [""], tools: "", 
      parts:"", tags: "#timing #timingchain" },
    { id: "3", carID: "CAR3", headline: "Mercedes SLK not starting", paragraphs: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "Paragraph 2", "Paragraph 3"], imgURLs: [""], tools: "", 
      parts:"", tags: "#battery #alternator #fuelpump" },
    { id: "4", carID: "CAR4", headline: "Rear brake discs and pads replacement", paragraphs: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "Paragraph 2", "Paragraph 3"], imgURLs: [""], tools: "", 
      parts:"", tags: "#brakediscs #brakepads #ebrake" },
  ];

  constructor(private router: Router) {}

  btnReadMoreClick(articleId: string) {
    this.router.navigate(['/article']);
  }
}
