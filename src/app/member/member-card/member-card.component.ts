import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user:User;
  constructor(private authService: AuthService, private userService: UserService, private alert: AlertifyService) { }

  ngOnInit() {
  }
  sendLike(id: number){
    this.userService.sendLike(this.authService.decodeToken.nameid,id)
    .subscribe(data => {
      this.alert.success('You have liked ' + this.user.knownAs);
    }, error => {
      this.alert.error(error);
    })
  }
}
