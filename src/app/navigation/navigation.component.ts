import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  settingsForm: FormGroup;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private router: Router) {
    this.settingsForm = this.fb.group({
      imagesOnly: [''],
      darkMode: ['']
    });

    settingsService.imageOnly.subscribe((val) => {
      this.settingsForm.patchValue({
        imageOnly: val
      }, {emitEvent: false});
    });

    settingsService.theme.subscribe((val) => {
      this.settingsForm.patchValue({
        darkMode: val === 'dark'? true : false
      }, {emitEvent: false});
    });

    this.searchForm = this.fb.group({
      term: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.settingsForm.valueChanges.subscribe((val) => {
      console.log(val);
      this.settingsService.setImageOnly(val.imagesOnly);
      this.settingsService.setTheme(val.darkMode? 'dark' : 'light');
    })
  }

  search() {
    if(this.searchForm.valid) {
      this.router.navigateByUrl(`/search?q=${this.searchForm.value.term}`)
    }
  }

}
