import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {RecommendTeacherService} from '../../../controller/service/recommend-teacher.service';
import {RecommendTeacher} from '../../../controller/model/recommend-teacher.model';
import {Prof} from '../../../controller/model/prof.model';

@Component({
  selector: 'app-recommendation-teacher',
  templateUrl: './recommendation-teacher.component.html',
  styleUrls: ['./recommendation-teacher.component.scss']
})
export class RecommendationTeacherComponent implements OnInit {

  constructor(private messageService: MessageService,
              private serviceUser: LoginService,
              private confirmationService: ConfirmationService, private service: RecommendTeacherService) { }

  ngOnInit(): void {

    console.log('ha data');
    console.log(this.prof.id);
    console.log(this.items);


  }
  dialog: boolean;
  get prof(): Prof {

    return this.service.prof;
  }

  set prof(value: Prof) {
    this.service.prof = value;
  }

  get items(): Array<RecommendTeacher> {
    return this.service.items;
  }

  set items(value: Array<RecommendTeacher>) {
    this.service.items = value;
  }

  get selected(): RecommendTeacher {
    return this.service.selected;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set selected(value: RecommendTeacher) {
    this.service.selected = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }


  public save() {
    this.selected.prof = this.serviceUser.prof;
    this.service.save().subscribe(data => {
      // @ts-ignore
      this.items.push({...data});
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Recommendation added',
        life: 3000,

      });
      console.log(this.selected);
      console.log('meryem');
      this.selected = new RecommendTeacher();

    });

    this.selected == null;
    this.editDialog = false;
  }

  showEditDialog() {
    this.dialog = true;
    this.service.findAllRecommendTeacher().subscribe(data => this.items = data);
  }
}



