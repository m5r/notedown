import { createStore, createTypedHooks } from 'easy-peasy';

import notes, { NotesModel } from './notes';
import user, { UserModel } from './user';

type StoreModel = {
	notes: NotesModel;
	user: UserModel;
};

const model: StoreModel = {
	notes,
	user
};

const { useActions, useStore, useDispatch } = createTypedHooks<StoreModel>();

const store = createStore(model);

export { useActions, useDispatch, useStore };

export default store;
