import { Component } from '@angular/core';
import { BlogService } from '../../../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  allData! : any
  blogData! : any
  //pagination
  currentPage : number = 1
  itemPerPage :number = 6
  totalPage : number = 0
  constructor(private blogServ : BlogService){
    this.getData()
  }
  getData(){
    this.blogServ.get().subscribe((data : any)=>{
      this.allData = data
      this.blogData = [...this.allData]
      this.totalPage = Math.ceil(this.blogData.length / this.itemPerPage)
      this.getPageination()
    })
  }
  getPageination(){
    const startIndex = (this.currentPage - 1) * this.itemPerPage
    const endIndex = startIndex + this.itemPerPage
    this.blogData = this.allData.slice(startIndex,endIndex)
  }
  prevPage(){
  if(this.currentPage > 1){
    this.currentPage--
    this.getPageination()
  }
  }
  nextPage(){
    if(this.currentPage < this.totalPage){
      this.currentPage++
      this.getPageination()
    }
  }
}
