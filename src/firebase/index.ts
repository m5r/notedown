import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Note } from '../state/notes';

const config = {
	apiKey: 'AIzaSyDoLLKnWr1jOJpA6PrQ81ooZGXVq4eZlE0',
	authDomain: 'notedown-9432c.firebaseapp.com',
	databaseURL: 'https://notedown-9432c.firebaseio.com',
	projectId: 'notedown-9432c',
	storageBucket: 'notedown-9432c.appspot.com',
	messagingSenderId: '353275719484',
};

export class FirebaseService {
	auth: app.auth.Auth;
	googleProvider: app.auth.GoogleAuthProvider;
	db: app.firestore.Firestore;

	constructor() {
		if (!app.apps.length) {
			app.initializeApp(config);
		}

		this.auth = app.auth();
		this.googleProvider = new app.auth.GoogleAuthProvider();
		this.db = app.firestore();
	}

	/* auth methods */
	async createUser(email: string, password: string) {
		return this.auth.createUserWithEmailAndPassword(email, password);
	}

	async logIn(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	async logOut() {
		return this.auth.signOut();
	}

	async logInWithGoogle() {
		return this.auth.signInWithPopup(this.googleProvider);
	}

	/* db methods */
	async fetchNotes(userUid: string): Promise<Note[]> {
		const collection = this.db.collection('notes');
		const query = collection.orderBy('lastModifiedAt', 'desc').where('owner', '==', userUid);
		const querySnapshot = await query.get();
		const notes = querySnapshot.docs.map((document) => {
			const data = document.data();
			const id = document.id;
			const note = {
				...data,
				id,
			} as Note;

			return note;
		});

		return notes;
	}

	async setNote(note: Note) {
		const collection = this.db.collection('notes');
		const query = collection.doc(note.id);

		return query.set(note);
	}

	async deleteNote(noteId: string) {
		const collection = this.db.collection('notes');
		const query = collection.doc(noteId);

		return query.delete();
	}
}

export default new FirebaseService();
