import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient:  HttpClient) { }

  public quizzes(){ 
    return this.httpClient.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any){ 
      return this.httpClient.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(qId:number){ 
    return this.httpClient.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId: number){ 
    return this.httpClient.get(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quiz: any){ 
    return this.httpClient.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuizzesOfCategory(cId:number){ 
    return this.httpClient.get(`${baseUrl}/quiz/category/${cId}`);
  }

  public getActiveQuizzes(){ 
    return this.httpClient.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzesOfCategory(cId:number){ 
    return this.httpClient.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
