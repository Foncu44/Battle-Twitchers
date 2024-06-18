import { Component } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  username = '';
  weapon = 'Sword';
  players = [];
  winner = null;

  constructor(private wsService: WebSocketService) {
    this.wsService.onMessage().subscribe((data) => {
      if (data.type === 'players') {
        this.players = data.players;
      } else if (data.type === 'winner') {
        this.winner = data.winner;
      }
    });
  }

  joinGame() {
    this.wsService.sendMessage({
      type: 'join',
      username: this.username,
      weapon: this.weapon
    });
  }
}
