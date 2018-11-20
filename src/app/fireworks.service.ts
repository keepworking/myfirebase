import { Injectable } from '@angular/core';

// firebase 도구 여기서는 모듈을 쓰지 않는다.
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AnhularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';

export interface Item { // 필드를 설정하는건데 개별적 관리를 위해서는 ID 가 필요.
  id?:string;// 사용자가 만들때 디비에 어떤 ID 를 넣을 지 모르니까 예외처리
  name: string;
}

// export interface User{
//   uid?:string;
//
// }

@Injectable({
  providedIn: 'root'
})
export class FireworksService {
  private itemCollection: AngularFirestoreCollection<Item>;
  // 여기서 컬랙션은 mySql 에서의 테이블과 유사하다 논sql 은 나도 잘 모르겟다...
  items: Observable<Item[]>;// Item 목록
  user: Observable<any[]>;
  constructor(
    private readonly db: AngularFirestore,
    private readonly auth: AngularFireAuth,
  ) {
    // db collection 에서 기능을 가져온다.
    this.itemCollection = db.collection<Item>('items');
    this.items = this.itemCollection.valueChanges();
    this.user = auth.user;
  }

  getUser():Observable<any[]>{
    return this.user;
  }

  getItems(): Observable<Item[]>{
    return this.items;
  }

  // 목록만 가져오면 안되지 추가도 하자
  addItem(item : Item){
    item.id = this.db.createId();
    this.itemCollection.doc(item.id).set(item);
    return item.id;//뭔 ID 로 생성됬는지 알아야하니.. 몰라도 되나?
  }

  // 고럼 삭제도 하자
  delItem(id:string){// 가져올때는 doc 으로 가져온다.
    this.itemCollection.doc(id).delete();
  }



}
