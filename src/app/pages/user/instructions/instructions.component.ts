import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  public qId: number; 
  public  quiz = { 
    title: '', 
    description: '', 
    maxMarks: 0, 
    numberofQuestions: 0, 
    active: true, 
    category: { 
      cid: '',
    }, 
  };
  constructor(
    private router: ActivatedRoute, 
    private quizService: QuizService, 
    private routerLink:  Router){}
  ngOnInit(): void {
    this.qId = this.router.snapshot.params['qId'];
    // console.log(this.qId);
    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => { 
        this.quiz = data;
      },
      (error) => { 
        console.log(error);
      } 
    )
  }

  public startQuiz(){ 
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Saved!', '', 'success')
        this.routerLink.navigate(['/start/'+ this.qId ]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
