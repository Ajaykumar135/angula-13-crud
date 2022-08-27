import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList=["BrandNew","SecondName","Refrubished"];

productForm !:FormGroup;

actionbtn : string="save";

  constructor(private formBuilder : FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogref : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      price : ['',Validators.required],
      freshness : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]

    });

    console.log(this.editData);

if(this.editData){
  this.actionbtn='Update';
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['comment'].setValue(this.editData.comment);
  this.productForm.controls['date'].setValue(this.editData.date);
}

  }

  
addproduct(){
  // console.log(this.productForm.value) to see in console

if(!this.editData){ //if this is not edited data then add data to db
   //to post the details to  db
   if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product added sucessfully")
        this.productForm.reset();
        this.dialogref.close('saved');
      },
      error:()=>{
        alert("Error while adding the product ")
      }
    })
  }
}
else{
  this.updateProduct();
}
}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next : (res)=>{
      alert("Product updated sucessfully");
      this.productForm.reset();
      this.dialogref.close("updated");
    },
    error:()=>{
      alert("error updating the details")
    }
  })

}

}
