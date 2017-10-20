import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


import { AuthService } from './shared/auth.service';
import { GoogleBooksApiService } from './shared/google-books-api.service';
import { AuthGuard } from "./shared/auth-guard.service";
import { BookService } from "./shared/book.service";
import { ShelfComponent } from './shelf/shelf.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ShelfComponent,
    NotFoundComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [BookService,AuthService,AuthGuard, GoogleBooksApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
