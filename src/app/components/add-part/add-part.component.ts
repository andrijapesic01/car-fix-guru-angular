import { Component } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { Engine } from 'src/app/models/engine.model';
import { Part } from 'src/app/models/part.model';
import { Transmission } from 'src/app/models/transmission.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent {
  part!: Part;
  categories: string[] = [];
  subCategories: string[] = [];
  cars: Car[] = [];
  transmissions: Transmission[] = []; 
  engines: Engine[] = []; 

  constructor(private storage: AngularFireStorage) {}

  onSelect(event: any) {
    const files: File[] = event.target.files;
    const uploadPromises: Promise<string>[] = [];

    for (const file of files) {
      const filePath = `parts-images/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      const uploadPromise = new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            try {
              const downloadURL = await fileRef.getDownloadURL().toPromise();
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          })
        ).subscribe();
      });

      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises)
      .then((downloadURLs) => {
        console.log('Files uploaded: ', downloadURLs);
        this.part.imgURLs = downloadURLs;
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
      });
  }

}
