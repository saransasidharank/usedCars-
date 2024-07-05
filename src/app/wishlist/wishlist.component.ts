import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allCars:any = []

  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {

    this.getWishlist()
    
  }

  getWishlist(){
    this.api.getWishlistAPI().subscribe((res:any)=>{
      this.allCars = res
      console.log(this.allCars);
      this.api.getWishlistCount()
    })
  }

  removeItem(id:any){
    this.api.removeWishlistItemAPI(id).subscribe((res:any)=>{
      this.getWishlist()
    })

  }

  addToCart(car:any){
    if(sessionStorage.getItem("token")){
      // proceed to cart
      car.quantity = 1
      this.api.addToCartAPI(car).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
          this.removeItem(car._id)
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })

    }else{
      this.toaster.info("Please Login...")

    }
  }

}
