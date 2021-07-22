import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user:User;
  @ViewChild('editform') editForm: NgForm;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotificarion($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private route:ActivatedRoute, private alert:AlertifyService, private userService: UserService, private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  updateUser(){
    this.userService.updateUser(this.authService.decodeToken.nameid,this.user).subscribe(next => {
      this.alert.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error =>{
      this.alert.error(error);
    });
  }
  updateMainPhoto(photoUrl: string){
    this.user.photoUrl = photoUrl;
  }
}
