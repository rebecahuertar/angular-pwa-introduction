import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  image: Image | undefined;

  constructor(
    private imagesServices: ImagesService,
    // para leer el parametro por url
    private activateRoute: ActivatedRoute,
    //redirect the user de esta vista si no hay un identificador valido
    private router: Router
  ) {}
  ngOnInit(): void {
    const identifier = this.activateRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    this.imagesServices.getImageById(identifier!).subscribe((image) => {
      if (!image) {
        return this.router.navigateByUrl('/');
      }

      this.image = image;
      console.log('Image --> ', this.image);
      return '';
    });
  }
}
