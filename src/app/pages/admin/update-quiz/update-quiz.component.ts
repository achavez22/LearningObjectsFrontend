import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  qId = 0;
  public quiz = { 
    title: '', 
    description: '', 
    maxMarks: '', 
    numberofQuestions: '', 
    active: true, 
    category: { 
      cid: '',
    }, 
  };
  public categories = [];

  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService, 
    private categoryService: CategoryService,
    private router:  Router,
    ){}


  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => { 
        this.quiz = data;
        console.log(this.quiz);
        
      },
    (error)=> { 
      console.log(error);
    })

    this.categoryService.categories().subscribe(
      (data: any) => { 
          this.categories =  data;
          //console.log(this.categories);
      },
      (error)=> { 
        console.log(error);
       // Swal.fire('Error', 'Error in loading data for server', 'error');
      }
    )
  }

  public updateData(){
    //validate 

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data: any) => { 
        this.router.navigate(['/admin/quizzes'])
        Swal.fire('Success', 'Quiz updated', 'success');
      },
      (error) => { 
        Swal.fire('Error', 'Error in process update Quiz ', 'error');
      }
    )
  }

}


