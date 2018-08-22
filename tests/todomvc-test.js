import { create } from "microstates";
import TodoMVC from "../todomvc";

let all = create(TodoMVC, {
  todos: [
    { id: 1, text: "Make initial commit", completed: false }, 
    { id: 2, text: "Write readme", completed: false }, 
    { id: 3, text: "Release microstates", completed: false }
  ]
});

let empty = create(TodoMVC);

describe('queries', () => {
  describe('hasTodos', () => {
    it('is true when todos are present', () => {
      expect(all.hasTodos).toBe(true);
    });
    it('is false when there are no todos', () => {
      expect(empty.hasTodos).toBe(false);
    });
  });

  describe('isAllComplete', () => {
    it('is false when there are no items', () => {
      expect(empty.isAllComplete).toBe(false);
    });

    it('is false when items are present but items are not complete', () => {
      expect(all.isAllComplete).toBe(false);
    });

    it('is true when all items are complete', () => {
      expect(all.toggleAll().isAllComplete).toBe(true);
    });
  });

  describe('hasCompleted', () => {
    it('is false when there are no items', () => {
      expect(empty.hasCompleted).toBe(false);
    });
    it('is true when one item is completed', () => {
      expect(all.todos[1].completed.set(true).hasCompleted).toBe(true);
    });
  });

  describe("filtered", () => {
    describe("set to ''", () => {
      it("does not filter results", () => {
        expect(all.filtered.state).toHaveLength(3);
      });
    });
    describe("set to 'show_completed'", () => {
      let todomvc = all.filter.set("show_completed");
      it("has no items to show", () => {
        expect(todomvc.filtered).toHaveLength(0);
      });
      it("has 2nd item after status of second item is changed", () => {
        let { filtered } = todomvc.todos[1].completed.set(true);
        expect(filtered).toHaveLength(1);
        expect(filtered[0]).toMatchObject({
          state: {
            id: 2,
            text: "Write readme",
            completed: true
          }
        });
      });
    });
    describe("set to 'show_active'", () => {
      let todomvc = all.filter.set('show_active');
      it('has 3 items', () => {
        expect(todomvc.filtered).toHaveLength(3);
      });
      it('has 2 items after status of first item is changed', () => {
        let { filtered } = todomvc.todos[0].completed.set(true);
        expect(filtered).toMatchObject([
          { state: { id: 2, text: "Write readme", completed: false } },
          { state: { id: 3, text: "Release microstates", completed: false } }
        ])
      });
    });
  });
  
  describe('filters', () => {
    let todomvc = all.todos[1].completed.set(true);
    it('has 3 filters', () => {
      expect(todomvc.filters).toMatchObject([
        {
          key: '',
          label: 'All',
          selected: true,
          select: expect.any(Function)
        },
        {
          key: 'show_active',
          label: 'Active',
          selected: false,
          select: expect.any(Function)
        },
        {
          key: 'show_completed',
          label: 'Completed',
          selected: false,
          select: expect.any(Function)
        }
      ])
    });
    it('sets filter to show_active when active filter is selected', () => {
      expect(todomvc.filters[1].select()).toMatchObject({
        state: {
          filter: 'show_active'
        }
      });
    });
    it('sets filter to show_completed when completed filter is selected', () => {
      expect(todomvc.filters[2].select()).toMatchObject({
        state: {
          filter: 'show_completed'
        }
      })
    });
  });
});

describe('transitions', () => {
  describe('insertNewTodo', () => {
    it("doesn't add a new item when newTodo is empty", () => {
      expect(all.insertNewTodo().todos.state).toHaveLength(3);
    });
    let changedNewTodo = all.newTodo.set('write more tests');
    let added = changedNewTodo.insertNewTodo();
    it('adds an item when newTodo is set', () => {
      expect(added.todos.state).toHaveLength(4);
    });
    it('adds item to the end of the list', () => {
      expect(added.todos[3]).toMatchObject({
        state: {
          text: 'write more tests',
          id: 4
        }
      })
    });
    it('clears newTodo after item is added', () => {
      expect(added.newTodo.state).toEqual('')
    });
  });
  
  describe('clearCompleted', () => {
    let oneIsCompleted = all.todos[1].completed.set(true);
    it('removes completed item from todos', () => {
      expect(oneIsCompleted.clearCompleted().todos.state).toMatchObject([
        { id: 1 },
        { id: 3 }
      ]);
    });
  });
  
  describe('toggleAll', () => {
    it('makes all items completed', () => {
      let none = all.toggleAll();
      expect(none.state).toMatchObject({
        todos: [
          { id: 1, completed: true },
          { id: 2, completed: true },
          { id: 3, completed: true },                
        ]
      })
    });
  });

  describe('Todo.edit', () => {
    let editing = all.todos[0].edit();
    it('puts the item into editing mode', () => {
      expect(editing.state).toMatchObject({
        todos: [
          { id: 1, editing: true },
          { id: 2, editing: false },
          { id: 3, editing: false }
        ]
      })
    });
  });

  describe('Todo.save', () => {
    let editing = all.todos[0].edit().todos[1].edit();
    it('stops editing', () => {
      expect(editing.todos[0].save().state).toMatchObject({
        todos: [
          { id: 1, editing: false },
          { id: 2, editing: true },
          { id: 3, editing: false }
        ]
      });
    });
  });
});



