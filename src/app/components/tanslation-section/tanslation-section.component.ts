import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishBoxComponent } from './english-box/english-box.component';
import { ArabicBoxComponent } from './arabic-box/arabic-box.component';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { BaleeghTranslateService } from '../../services/baleegh-translate.service';

@Component({
  selector: 'app-tanslation-section',
  standalone: true,
  imports: [CommonModule, FormsModule, EnglishBoxComponent, ArabicBoxComponent],
  templateUrl: './tanslation-section.component.html',
  styleUrl: './tanslation-section.component.scss',
})
export class TanslationSectionComponent implements OnInit {
  private textSubject = new Subject<string>();
  translatedText: { translation: string } = { translation: '' };

  constructor(private baleeghTranslateService: BaleeghTranslateService) {
    this.textSubject
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((value) =>
          baleeghTranslateService.getBaleeghTranslatation(value)
        )
      )
      .subscribe({
        next: (response) => {
          this.translatedText = response;
        },
        error: (error) => {
          console.error('Translation error:', error); // Handle error response
        },
      });
  }
  onTextChange(value: string): void {
    this.textSubject.next(value);
  }
  ngOnInit(): void {
    console.log('TanslationSectionComponent initialized');
  }
  prints() {
    console.log(this.translatedText);
  }
}
