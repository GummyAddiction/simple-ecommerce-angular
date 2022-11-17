import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  private categoryid!: number;
  private category!: Category;

  public categoryForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });
  constructor(
    private ecommerceService: EcommerceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryid = Number(params.get('categoryid'));
      console.log(this.categoryid);

      if (this.categoryid != 0) {
        this.setCategoryForm();
      }
    });
  }

  addCategory(): void {
    this.ecommerceService
      .addCategory(this.categoryForm.value)
      .subscribe((result) => {
        console.log(result);
      });
  }

  onSubmit(): void {
    if (this.categoryid != 0) {
      this.setCategory();
      this.updateCategory();
      this.router.navigate(['admin/category']).then(() => {
        window.location.reload();
      });
    } else {
      this.addCategory();
      this.router.navigate(['admin/category']).then(() => {
        window.location.reload();
      });
    }
  }

  onDiscard(): void {
    this.router.navigate(['admin/category']).then(() => {
      window.location.reload();
    });
  }

  setCategory(): void {
    this.category.description = this.categoryForm.get('description')?.value;
    this.category.name = this.categoryForm.get('name')?.value;
  }

  updateCategory(): void {
    this.ecommerceService.updateCategory(this.category).subscribe((result) => {
      console.log(result);
    });
  }

  setCategoryForm() {
    this.ecommerceService
      .getCategoryById(this.categoryid)
      .subscribe((result) => {
        this.category = result;
        this.categoryForm.setValue({
          description: result.description,
          name: result.name,
        });
      });
  }
}
