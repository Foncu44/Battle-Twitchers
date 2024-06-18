import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { WinnerComponent } from './winner/winner.component';
import { WebSocketService } from './web-socket.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayerListComponent,
    WinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
