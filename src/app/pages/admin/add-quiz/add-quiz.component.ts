import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  public categories = [];

  public quizData = { 
    title: '', 
    description: '', 
    maxMarks: '', 
    numberofQuestions: '', 
    active: true, 
    category: { 
      cid: '',
    }, 
  };

  constructor(
    private categoryService:  CategoryService,
    private snack:  MatSnackBar,
    private quizService: QuizService
    ){ }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => { 
          this.categories =  data;
          //console.log(this.categories);
      },
      (error)=> { 
        console.log(error);
        Swal.fire('Error', 'Error in loading data for server', 'error');
      }
    )
  }
  //add quiz
  public formSubmit(){ 
    if(this.quizData.title.trim() == '' ||  this.quizData.title == null){ 
      this.snack.open("Title is required", 'close', { 
        duration: 2000
      })
      return; 
    }

    if(this.quizData.description.trim() == '' ||  this.quizData.description == null){ 
      this.snack.open("Description is required", 'close', { 
        duration: 2000
      })
      return; 
    }

    this.quizService.addQuiz(this.quizData).subscribe(
      (data) => { 
        Swal.fire('Success', 'quiz is added success', 'success');
        this.quizData = { 
          title: '', 
          description: '', 
          maxMarks: '', 
          numberofQuestions: '', 
          active: true, 
          category: { 
            cid: '',
          }, 
        };

      },
      (error)=> { 
          console.log(error);
        Swal.fire('Error', 'Error while adding quiz...', 'error'); 
      })

  }
}
