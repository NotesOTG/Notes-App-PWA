import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerUserService } from 'src/app/core/services/online/server-user.service';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  public token: string = "";
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  success: boolean = null;
  serverError = "";

  constructor(private route: ActivatedRoute, private router: Router, private userService: ServerUserService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token == null || this.token.length < 1) {
      this.router.navigateByUrl('/');
      return;
    }

    this.userService.confirmEmail(this.token).subscribe((response: BasicResponse) => {
      this.success = response.success;
      if (!this.success) {
        this.serverError = response.error;
      }
    });

  }

}
