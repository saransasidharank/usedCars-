import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  searchTerm = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0)
  SERVER_URL = "https://usedcars-z3za.onrender.com"
  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

  getAllCarsAPI(){
    return this.http.get(`${this.SERVER_URL}/all-cars`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }
  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  viewCarAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-car/${id}`)
  }

  appendTokenToHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(car:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,car,this.appendTokenToHeader())
  }

  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist-remove/${id}`,this.appendTokenToHeader())

  }

  addToCartAPI(car:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,car,this.appendTokenToHeader())

  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  // removecartitem
  removeCartItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`,this.appendTokenToHeader())
  }
  // increment cart

  incrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-increment/${id}`,this.appendTokenToHeader())
  }
  // decrement cart item
  decrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`,this.appendTokenToHeader())

  }

  // empty cart
  emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenToHeader())
  }

  isLoggedin(){
    return !!sessionStorage.getItem("token")
  }

}
