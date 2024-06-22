import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData)

    // Send Http request

    this.http.post('https://angular-learning-apis-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData)
    .subscribe( response => {
      console.log(response);
    });
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://angular-learning-apis-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    .pipe(map((responseData: { [key: string]: any }) => {
      const postArray = [];
      for ( const key in responseData){
        if (responseData.hasOwnProperty(key)){
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }))
    .subscribe(posts => {
      console.log(posts);
    })
  }
}
