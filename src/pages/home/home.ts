import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddNotePage } from '../add-note/add-note';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';
import { AddNotePageModule } from '../add-note/add-note.module';
import { ViewNotePage } from '../view-note/view-note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: Promise<Note[]>; //promise for ionViewWillEnter
  note: Note;

  constructor(public navCtrl: NavController, private noteService: NoteService) {

  }
  // runs when a page is about to enter, lifecycle events.
  ionViewWillEnter(){
    this.notes = this.getAllNotes();
  }
  addNote(){
    this.navCtrl.push(AddNotePage);
  }

  getNote(createDate: number){
    this.noteService.getNote(createDate).then((n) => { //set note when the promise resolves
      this.note = n;
      this.navCtrl.push(ViewNotePage, { note: this.note }) // passing object called note, set as note
    })
  }

  getAllNotes(){
    return this.noteService.getAllNotes();
  }

}
