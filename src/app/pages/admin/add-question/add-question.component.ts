import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  public qId: number = 0;
  public title: string = '';
  public question ={ 
    quiz: { 
    }, 
    content: '', 
    option1: '', 
    option2: '', 
    option3: '', 
    option4: '', 
    answer: '', 
  };
  constructor(
    private actRouter: ActivatedRoute, 
    private snack:  MatSnackBar, 
    private router:  Router, 
    private questionService: QuestionService
    ){ }
  ngOnInit(): void {
    this.qId = this.actRouter.snapshot.params['qid'];
    this.title = this.actRouter.snapshot.params['title']; 
    // console.log('qID: '+ this.qId);
    this.question.quiz['qId'] = this.qId;
  }
 
  formSubmit(){ 
    // console.log('click in submit');
    if(this.question.content.trim() == '' ||  this.question.content == null){ 
      this.snack.open("Content is required", 'close', { 
        duration: 3000
      })
      return; 
    }
    
    if(this.question.option1.trim() == '' ||  this.question.option1 == null){ 
      this.snack.open("Option 1 is required", 'close', { 
        duration: 3000
      })
      return; 
    }

    if(this.question.option2.trim() == '' ||  this.question.option2 == null){ 
      this.snack.open("Option 2 is required", 'close', { 
        duration: 3000
      })
      return; 
    }

    if(this.question.answer.trim() == '' ||  this.question.answer == null){ 
      this.snack.open("Answer is required", 'close', { 
        duration: 3000
      });
      return; 
    }


    this.questionService.addQuestion(this.question).subscribe(
      (data:  any)=> { 
        this.router.navigate(['/admin/view-questions/', this.qId, this.title])
        Swal.fire('Success', 'Questio added ', 'success');
      }, 
      (error) => { 
        console.log(error);
      } 
    );
  }

}
