import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
   searchKey:string = ""
  allCars:any = []
  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getAllCar()
    this.api.searchTerm.subscribe((res:any)=>{
      this.searchKey = res
    })
    
  }

  getAllCar(){
    this.api.getAllCarsAPI().subscribe({
      next:(res:any)=>{
        this.allCars =res
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
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
