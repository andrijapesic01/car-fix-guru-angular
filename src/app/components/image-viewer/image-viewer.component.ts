import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
  imgPath: string = environment.api.apiUrl;
  @Input() images: string[] = []; 
  currentImageIndex = 0;

  showNextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}
