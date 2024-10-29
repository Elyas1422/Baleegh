import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-english-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './english-box.component.html',
  styleUrls: [
    './english-box.component.scss',
    '../tanslation-section.component.scss',
  ],
})
export class EnglishBoxComponent {
  @Output() textChange = new EventEmitter<string>();
  recognizedText: string = '';
  recognition: any;
  isListening: boolean = false;

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

  // Remove characters that are not in English text
  validateEnglish(event: any) {
    const allowedCharacters = /^[a-zA-Z0-9 .,!?'"()\-]*$/;

    if (!allowedCharacters.test(event.target.value)) {
      event.target.value = event.target.value.replace(
        /[^a-zA-Z0-9 .,!?'"()\-]/g,
        ''
      );
      this.recognizedText = event.target.value;
    }
    this.textChange.emit(this.recognizedText); // Emit the textarea value
  }
}
