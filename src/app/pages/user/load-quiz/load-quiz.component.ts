import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  private catId : number = 0;
  public quizzes = [];  
  constructor(private router: ActivatedRoute, 
              private quizService: QuizService, 
              public loginService:  LoginService){}

  ngOnInit(): void {

    this.router.params.subscribe((params) => { 
      this.catId = params['catId'];
      if(this.catId == 0){ 

        this.quizService.getActiveQuizzes().subscribe(
          (data: any) => { 
            this.quizzes = data; 
          },
          (error) => { 
            console.log(error);
          }
        );
      }else { 
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => { 
            this.quizzes = data; 
          },
          (error) => { 
            console.log(error);
          }
        );
      }
    });

  }

  public viewQuiz(){

  }

}
