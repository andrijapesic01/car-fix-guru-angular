import { Component } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  
  article: Article = { id: "1", carID: "CAR1", headline: "Oil change Audi A6 C7 (4G)", paragraphs: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "Paragraph 2", "Paragraph 3"], imgURLs: ["./assets/part-images/mahle-oil-filter.jpg","./assets/part-images/motul-oil-5w30.jpg", "./assets/part-images/brembo-brake-disc.jpg"], tools: "", 
  parts:"", tags: "#oilchange #filter #oil" };

  constructor() {

  }


}
