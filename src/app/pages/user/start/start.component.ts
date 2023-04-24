import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  public qId;
  public questions: any;
  public questionSize: number = 0;

  public marksGot: number = 0; 
  public correctAnswers = 0; 
  public attempted = 0; 
  public isSubmit = false; 
  public timer: any;

  constructor(
    private locationSt: LocationStrategy, 
    private route: ActivatedRoute, 
    private questionService: QuestionService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.preventBackButton();
    this.qId = this.route.snapshot.params['qId'];
    this.loadQuestion(this.qId);
  }
  private loadQuestion(qId: number) {
    this.questionService.getQuestionsOfQuiz(qId).subscribe(
      (data: any) => { 
        this.questions =data;
        this.questionSize = this.questions.length;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q:any) => {
        q['givenAnswer'] ='';
       });
      //console.log(this.questions);
      this.startTimer();
      
      },
    (error) => { 
      console.log(error);
      
    }
    );
  }
  public preventBackButton(){ 
    history.pushState(null, null, location.href); 
    this.locationSt.onPopState(
      () => { 
        history.pushState(null, null, location.href);
      });
  }

  public submitQuiz(){ 
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'submit',
      denyButtonText: `Don't submit`,
      icon: 'info'
    }).then((result) => {
      
      if (result.isConfirmed) {
          
         this.evalQuiz(); 
        
      } else if (result.isDenied) {
       // Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  private startTimer(){ 
    let t: any = window.setInterval(()=> {
      if(this.timer<=0 ){ 
        this.evalQuiz();
        this.submitQuiz();
        clearInterval(t);
      }else{ 
        this.timer--;
      }
    }, 1000)
  }

  public getFormattedTime(){ 
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60; 
    return `${mm} min: ${ss} sec`
  } 

  private evalQuiz(){

   
    this.questionService.evalQuiz(this.questions).subscribe(
      (data: any) => { 
        this.correctAnswers = data.correctAnswers;
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted = data.attempted;
        this.isSubmit =true;
        // console.log(data);
      },
      (error) => { 
        console.log(error);

      }
    )
    // 
    // //calculating 
    // this.questions.forEach(q => {
    //     if(q.givenAnswer == q.answer){ 
    //       this.correctAnswer++;
    //       let marksSingle = this.questions[0].quiz.maxMarks /this.questions.length;
    //       this.marksGot += marksSingle;
    //     }

    //     if(q.givenAnswer.trim() != ''){ 
    //       this.attempted++; 
    //     }
    // });

  }

  public printPage(){ 
    window.print();
  }

}
