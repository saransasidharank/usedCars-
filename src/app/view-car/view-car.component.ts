import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent implements OnInit {

  car:any = {}
  constructor(private route:ActivatedRoute,private api:ApiService, private toaster:ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} =res
      this.getCar(id)
      
    })
  }

  getCar(cid:any){
    this.api.viewCarAPI(cid).subscribe((res:any)=>{
      this.car = res
      console.log(this.car);
      
    })

  }

  addTowishlist(car:any){
    if(sessionStorage.getItem("token")){
      // proceed to wishlist
      this.api.addToWishlistAPI(car).subscribe({
        next:(res:any)=>{
          this.toaster.success(`Car '${res.title}' added to your wishlist`)
          this.api.getWishlistCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toaster.warning(reason.error)
          
        }
      })

    }else{
      this.toaster.info("Please Login...")

    }

  }
  
  addToCart(car:any){
    if(sessionStorage.getItem("token")){
      // proceed to cart
      car.quantity = 1
      this.api.addToCartAPI(car).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
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
