import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/Message';
import { PaginatedResult, Pagination } from '../models/Paginations';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private alert: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
    this.loadMessages();
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodeToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alert.error(error);
    });
  }

  deleteMessage(id: number){
    this.alert.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodeToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alert.success('Message has been deleted');
      }, error => {
        this.alert.error('Failed to delete the message');
      });
    });
  }

  pageChanged(event: any){
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
