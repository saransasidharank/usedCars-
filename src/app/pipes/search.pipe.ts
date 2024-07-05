import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allCars:any[],searchkey:string): any[] {
    const result : any=[]
    if(!allCars || searchkey==""){
      return allCars
    }
    allCars.forEach((item:any)=>{
      if(item["title"].trim().toLowerCase().includes(searchkey.toLowerCase().trim())){
        result.push(item)
      }
    })
    return result;
  }

}
