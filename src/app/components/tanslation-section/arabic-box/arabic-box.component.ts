import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-arabic-box',
  standalone: true,
  imports: [],
  templateUrl: './arabic-box.component.html',
  styleUrls: [
    './arabic-box.component.scss',
    '../tanslation-section.component.scss',
  ],
})
export class ArabicBoxComponent {
  translatedText: string = 'النص المترجم';

  constructor(private clipboard: Clipboard) {}

  copyText() {
    this.clipboard.copy(this.translatedText);
    alert('تم النسخ');
  }
}
