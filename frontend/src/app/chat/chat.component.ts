import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { Server, Update } from '../shared/models/server';
import { User } from '../shared/models/user';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { Channel } from '../shared/models/channel';

enum Dialog {
  NONE = -1,
  ADMIN = 0,
  ADD_SERVER = 1,
  ADD_CHANNEL = 2
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  Dialog = Dialog;
  user!: User;
  // servers = new Map<number, Server>()
  servers: Server[] = [];
  selectedServer!: Server;
  selectedChannel!: Channel;
  image: string = "";
  dialogOption: Dialog = Dialog.NONE;
  @Input() postText: string = "";

  constructor(private chatService: ChatService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.chatService.getServers().subscribe(servers => {
      this.servers = servers;
    });

    // } else {
    //   this.router.navigate(['login']);
  }

  closeDialog() {
    this.dialogOption = Dialog.NONE;
  }

  changeServer(index: number) {
    this.selectedServer = this.servers[index];
  }

  onNewServer(server: Server) {
    this.servers.push(server);
    this.closeDialog();
  }

  onServerDeleted(server: Server) {
    this.servers.splice(this.servers.indexOf(server), 1);
    this.closeDialog();
    this.selectedServer = this.servers[0];
  }

  onNewChannel(channel: Channel) {
    this.selectedServer.channels.push(channel);
  }

  post() {
    // this.chatService.post({ serverID: this.currentConnection.serverID, text: this.postText, media: "" });
    this.postText = "";
    //  this.socket.send(JSON.stringify(message));
  }

  openDialog(option: Dialog) {
    this.dialogOption = option;
  }

}
