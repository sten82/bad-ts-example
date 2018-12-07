import { Component, EventEmitter, OnInit, Input, Output, OnChanges, OnDestroy } from '@angular/core';
import { UserService, HintService, SecretService } from './services';
import { Logger } from './logger';

@Component({
  selector: 'app-example',
  templateUrl: './xemaple.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() title: string;
  @Output() onXSelect = new EventEmitter<boolean>();
  selectedUser: User;
  userId: number;

  config: any;
  configData: any;

  lang: string;
  timezone: string;
  hasGoodResolution: boolean;

  selectX(): void {
    const emittedUser: any = this.selectedUser
    emittedUser.id = this.id;
    this.onXSelect.emit(emittedUser);
  }

  constructor(userService: UserService, private macs: MyAppConfigService, private hintService: HintService, private logger: Logger, public secretService: SecretService) {
    this.config = this.macs.subscribe(result => {
      this.configData = result;
    });

    this.title = 1337;

    this.initStuff();
  }

  initStuff(): void {
    if (this.isThisGood()) {
    this.title = 'Good Component';
    } else {
    this.title = 'Bad Component';
    }

    if (!this.configData.timeZone) {
      this.timezone = "UTC";
    } else {
      this.timezone = this.configData.timeZone;
    }

    if (this.configData.language) {
      this.lang = this.configData.language;
    } else {
      this.lang = 'en';
    }

    let width = window.screen.width;

    if (width > 1000) {
      this.hasGoodResolution = true;
    } else {
      this.hasGoodResolution = false;
    }

  }

  getUser(): void {
    var me = this;
    this.userService.getUser().then(function (user) {
      this.selectedUser = user;
      me.userId = user.id;
    });
  }

  isThisGood() {
    return false;
  }

}

interface User {
  id: number,
  username: any;
  email;
}
