import { createStore, createTypedHooks } from 'easy-peasy';

import notes, { NotesModel } from './notes';

type StoreModel = {
	notes: NotesModel;
};

const model: StoreModel = {
	notes,
};

const { useActions, useStore, useDispatch } = createTypedHooks<StoreModel>();

const store = createStore(model);

export { useActions, useDispatch, useStore };

export default store;
