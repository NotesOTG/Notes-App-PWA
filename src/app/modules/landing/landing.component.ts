import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SiteConfigurations } from 'src/app/core/configs/site-configurations';
import { GlobalService } from 'src/app/core/services/offline/global.service';
import { NoteService } from 'src/app/core/services/note.service';
import { AuthenticationService } from 'src/app/core/services/online/authentication.service';
import { LoginResponse } from 'src/app/shared/exchanges/responses/impl/login-response';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  // private authService: SocialAuthService
  constructor(    
    public noteService: NoteService,
    private router: Router,
    private global: GlobalService
  ) { }

  ngAfterViewInit(): void {
    //Checks if this component has been loaded before. If it hasn't but we have notes we redirect
    if (this.noteService.notes.length > 0 && !this.global.hasLandingLoaded()) {
      this.router.navigateByUrl('/notes');
    }
  }

  ngOnInit(): void {
    document.title = SiteConfigurations.TTILE + 'Landing';
  }
  
  public createAndNavigateNotes() {
    if (this.router.url !== '/notes') {
      this.router.navigateByUrl('/notes');
    }
    setTimeout(() => {
      this.noteService.stateSubject.next(StateTypes.CREATE);
    }, 50);
  }

}
