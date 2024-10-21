import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishBoxComponent } from './english-box/english-box.component';
import { ArabicBoxComponent } from './arabic-box/arabic-box.component';

@Component({
  selector: 'app-tanslation-section',
  standalone: true,
  imports: [CommonModule, FormsModule, EnglishBoxComponent, ArabicBoxComponent],
  templateUrl: './tanslation-section.component.html',
  styleUrl: './tanslation-section.component.scss',
})
export class TanslationSectionComponent {
  recognizedText: string = '';
  recognition: any;
  isListening: boolean = false;
  translatedText: string = '';

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize the Web Speech API (SpeechRecognition)
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    // Listen for recognition results
    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      this.recognizedText += speechResult + ' ';
      this.cdr.detectChanges();
    };

    // Handle errors
    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    // Handle the end of recognition
    this.recognition.onend = () => {
      this.isListening = false;
      this.cdr.detectChanges();
    };
  }

  // Method to start the recognition process
  startRecognition(): void {
    this.isListening = true;
    this.recognition.start();
  }
}
