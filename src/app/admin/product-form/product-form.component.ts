import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  public product!: Product;
  public categories: Category[] = [];
  private id!: number;

  public productForm = new FormGroup({
    name: new FormControl(),
    category_id: new FormControl(),
    image: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private ecommerceService: EcommerceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
      console.log(this.id);
    });

    if (this.id != 0) {
      this.setProductFormById(this.id);
    }
  }

  getAllCategories(): void {
    this.ecommerceService.getAllCategory().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  addProduct(): void {
    this.ecommerceService
      .addProduct(this.productForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateProduct(): void {
    this.ecommerceService.updateProduct(this.product).subscribe((result) => {
      console.log(result);
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
    if (this.id != 0) {
      this.setProductByForm();
      this.updateProduct();
      this.router.navigate(['admin/product']).then(() => {
        window.location.reload();
      });
    } else {
      this.addProduct();
      this.router.navigate(['admin/product']).then(() => {
        window.location.reload();
      });
    }
  }

  onDiscard(): void {
    this.router.navigate(['admin/product']).then(() => {
      window.location.reload();
    });
  }
  setProductByForm(): void {
    //console.log(this.productForm.get('name')?.value)
    this.product.name = this.productForm.get('name')?.value;
    this.product.category_id = this.productForm.get('category_id')?.value;
    this.product.image = this.productForm.get('image')?.value;
    this.product.price = this.productForm.get('price')?.value;
    this.product.description = this.productForm.get('description')?.value;
  }

  setProductFormById(id: number): void {
    this.ecommerceService.getProductById(id).subscribe((result) => {
      this.product = result;
      console.log(this.product);

      this.productForm.setValue({
        name: this.product.name,
        category_id: this.product.category_id,
        image: this.product.image,
        price: this.product.price,
        description: this.product.description,
      });
    });
  }
}
