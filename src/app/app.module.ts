import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { SampleWishComponent } from './sample-wish/sample-wish.component';
import { NewsComponent } from './news/news.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PostsComponent } from './posts/posts.component';
import { UserOperationComponent } from './user-operation/user-operation.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { FollowersComponent } from './followers/followers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FollowingComponent } from './following/following.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'userdetails', component: UserDetailsComponent },
      { path: 'following', component: FollowingComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'news', component: NewsComponent },
      { path: 'home-admin', component: HomeAdminComponent}
    ],
  },
  // { path: 'followers', component: FollowersComponent },
  // { path: 'following', component: FollowingComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    WelcomeComponent,
    HomeComponent,
    NotfoundComponent,
    SampleWishComponent,
    NewsComponent,
    HomeAdminComponent,
    PostsComponent,
    UserOperationComponent,
    AdvertiseComponent,
    FollowersComponent,
    UserDetailsComponent,
    FollowingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}