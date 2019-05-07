import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../../models/note.model';
import { AddNotePageModule } from '../../pages/add-note/add-note.module';

@Injectable()
export class NoteService {

  //for data persistence
  private notes: Note[] = [];

  private note: Note;

  constructor(public storage: Storage) {
  }

  //for data persistence
  saveNote(note: Note){
    note.createDate = Date.now(); //retrieving the date created
    this.notes.push(note);
    this.storage.set('notes', this.notes); //notes key
  }

  getAllNotes(){
    return this.storage.get('notes').then( 
      (notes) => {
        this.notes = notes == null ? [] : notes; //when notes is null set empty array
        return[...this.notes]; //returns
      }
    )
  }   

  //
  //
  //
  //
  // i put in "this" for line 41. remove it probs
  getNote(createDate: number){
    return this.storage.get('notes').then((note) => {
      this.note = [...this.notes].find(r => r.createDate === createDate);
      return this.note;
    });
  }
  deleteNote(createDate: number){
    //return where the create date on note is not equal to the create date passed
    //.filter to return the notes array with all elements except the one containg create date thats going to be removed
    this.notes = this.notes.filter((note) =>{
      return note.createDate !== createDate});

      this.storage.set('notes', this.notes);
    }
    
  }

