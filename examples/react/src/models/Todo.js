import { create } from 'microstates';

export default class Todo {
  id = create(Number);
  text = create(String, '');
  completed = create(Boolean, false);
  editing = create(Boolean, false);
}