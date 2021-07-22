import { Routes } from "@angular/router";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./member/member-detail/member-detail.component";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsResolver } from "./resolver/lists.resolver";
import { MemberDetailResolver } from "./resolver/member-detail.resolver";
import { MemberEditResolver } from "./resolver/member-edit.resolver";
import { MemberListResolver } from "./resolver/member-list.resolver";
import { MessagesResolver } from "./resolver/messages.resolver";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChanges } from "./_guards/prevent-usanved-changes.guard";

export const appRoutes: Routes = [
    
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent ,resolve: {messages: MessagesResolver} },
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
            { path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}}
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];