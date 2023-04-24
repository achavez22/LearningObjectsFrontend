import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  public qId: number = 0; 
  public qTitle: string = ''; 
  public questions = []

  constructor(
    private route: ActivatedRoute, 
    private snack:  MatSnackBar, 
    private questionService: QuestionService){}
  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => { 
        this.questions = data;
        console.log(data);
        
      }, 
      (error)=>{ 
        console.log(error);
      }
    );
  }

  public deleteQuestion(quesId: number){ 
      // alert(quesId);

      Swal.fire({
        title: `Are you sure, want remove this question Id:  ${quesId} ?`,
        text: "You will not be able to revert this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
      }).then((result) => {
        if (result.isConfirmed) {
            this.questionService.deleteQuestion(quesId).subscribe(
                (data) => { 
                  this.questions = this.questions.filter(q => q.quesId != quesId);
                  this.snack.open('Question deleted' , 'close', { 
                    duration: 3000
                  });
                  //Swal.fire("Success", "Question deleted", 'success');
                }, 
                (error)=> { 
                  this.snack.open('Error in deleting question' , 'close', { 
                    duration: 3000
                  });
                  //Swal.fire("Error!!", "Error in deleting question", 'error');
                });
  
         
        }
      });
  }

}
