import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) {}

  public getQuestionsOfQuiz(qId: number){ 
    return this.httpClient.get(`${baseUrl}/question/quiz/${qId}`);
  }

  public addQuestion(question: any){ 
    return this.httpClient.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: number){ 
    return this.httpClient.delete(`${baseUrl}/question/${questionId}`);
  }

  public evalQuiz(questions: any){ 
    return this.httpClient.post(`${baseUrl}/question/eval-quiz`,questions);
  }
  

}
