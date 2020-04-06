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
import { PostsComponent } from './posts/posts.component';
import { UserOperationComponent } from './user-operation/user-operation.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { FollowersComponent } from './followers/followers.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'followers', component: FollowersComponent },
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
    PostsComponent,
    UserOperationComponent,
    AdvertiseComponent,
    FollowersComponent,
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
