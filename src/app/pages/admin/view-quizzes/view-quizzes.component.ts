import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  public quizzes =[];
  constructor(private quizService: QuizService){}
  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data: any) => { 
        this.quizzes = data; 
        console.log(data);
      }, 
      (error) => { 
        Swal.fire("Error!!", "Error in loading data", 'error');
        console.log(error);
      }
    )
  }

  public deleteQuiz(quiz:any){ 
    if(quiz==null){ ; 
      Swal.fire("Error!!", "Error in deleting quiz", 'error');
      return; 
    }

    
    Swal.fire({
      title: `Are you sure to remove the quiz:  ${quiz.title} ?`,
      text: "You will not be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
          this.quizService.deleteQuiz(quiz.qId).subscribe(
              (data) => { 
                this.quizzes = this.quizzes.filter(q => q != quiz)
                Swal.fire("Success", "quiz deleted", 'success');
              }, 
              (error)=> { 
                Swal.fire("Error!!", "Error in deleting quiz", 'error');
              });

       
      }
    });
  }


}
