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

describe("queries", () => {
  describe("hasTodos", () => {
    it("is true when todos are present", () => {
      expect(all.hasTodos).toBe(true);
    });
    it("is false when there are no todos", () => {
      expect(empty.hasTodos).toBe(false);
    });
  });

  describe("isAllComplete", () => {
    it("is false when there are no items", () => {
      expect(empty.isAllComplete).toBe(false);
    });

    it("is false when items are present but items are not complete", () => {
      expect(all.isAllComplete).toBe(false);
    });

    it("is true when all items are complete", () => {
      expect(all.toggleAll().isAllComplete).toBe(true);
    });
  });

  describe("hasCompleted", () => {
    it("is false when there are no items", () => {
      expect(empty.hasCompleted).toBe(false);
    });
    it("is true when one item is completed", () => {
      let [, second] = all.todos;
      expect(second.completed.set(true).hasCompleted).toBe(true);
    });
  });

  describe("filtered", () => {
    describe("set to ''", () => {
      it("does not filter results", () => {
        expect(all.filtered).toHaveLength(3);
      });
    });
    describe("set to 'show_completed'", () => {
      let todomvc = all.filter.set("show_completed");
      it("has no items to show", () => {
        expect(todomvc.filtered).toHaveLength(0);
      });
      it("has 2nd item after status of second item is changed", () => {
        let [, second] = todomvc.todos;
        let { filtered } = second.completed.set(true);
        let [result] = filtered;
        expect(filtered).toHaveLength(1);
        expect(result.id.state).toBe(2);
        expect(result.text.state).toBe("Write readme");
        expect(result.completed.state).toBe(true);
      });
    });
    describe("set to 'show_active'", () => {
      let todomvc = all.filter.set("show_active");
      it("has 3 items", () => {
        expect(todomvc.filtered).toHaveLength(3);
      });
      it("has 2 items after status of first item is changed", () => {
        let [todo] = todomvc.todos;
        let {
          filtered: [first, second]
        } = todo.completed.set(true);

        expect(first.id.state).toBe(2);
        expect(first.text.state).toBe("Write readme");
        expect(first.completed.state).toBe(false);

        expect(second.id.state).toBe(3);
        expect(second.text.state).toBe("Release microstates");
        expect(second.completed.state).toBe(false);
      });
    });
  });

  describe("filters", () => {
    let [, second] = all.todos;
    let todomvc = second.completed.set(true);
    it("has 3 filters", () => {
      expect(todomvc.filters).toMatchObject([
        {
          key: "",
          label: "All",
          selected: true,
          select: expect.any(Function)
        },
        {
          key: "show_active",
          label: "Active",
          selected: false,
          select: expect.any(Function)
        },
        {
          key: "show_completed",
          label: "Completed",
          selected: false,
          select: expect.any(Function)
        }
      ]);
    });
    it("sets filter to show_active when active filter is selected", () => {
      expect(todomvc.filters[1].select().filter.state).toBe("show_active");
    });
    it("sets filter to show_completed when completed filter is selected", () => {
      expect(todomvc.filters[2].select().filter.state).toBe("show_completed");
    });
  });
});

describe("transitions", () => {
  describe("insertNewTodo", () => {
    it("doesn't add a new item when newTodo is empty", () => {
      expect(all.insertNewTodo().todos).toHaveLength(3);
    });
    let changedNewTodo = all.newTodo.set("write more tests");
    let added = changedNewTodo.insertNewTodo();
    it("adds an item when newTodo is set", () => {
      expect(added.todos).toHaveLength(4);
    });
    it("adds item to the end of the list", () => {
      let [,,,last] = added.todos;
      expect(last.text.state).toBe("write more tests");
      expect(last.id.state).toBe(4);
    });
    it("clears newTodo after item is added", () => {
      expect(added.newTodo.state).toEqual("");
    });
  });

  describe("clearCompleted", () => {
    let [,second] = all.todos;
    let oneIsCompleted = second.completed.set(true);
    it("removes completed item from todos", () => {
      let [first, third] = oneIsCompleted.clearCompleted().todos;
      expect(first.id.state).toBe(1);
      expect(third.id.state).toBe(3);
    });
  });

  describe("toggleAll", () => {
    it("makes all items completed", () => {
      let none = all.toggleAll();
      let [first, second, third] = none.todos;
      expect(first.completed.state).toBe(true);
      expect(second.completed.state).toBe(true);
      expect(third.completed.state).toBe(true);            
    });
  });

  describe("Todo.edit", () => {
    let [first] = all.todos;
    let editing = first.edit();
    it("puts the item into editing mode", () => {
      let [first, second, third] = editing.todos;
      expect(first.editing.state).toBe(true);
      expect(second.editing.state).toBe(false);
      expect(third.editing.state).toBe(false);
    });
  });

  describe("Todo.save", () => {
    let [first] = all.todos;
    let [,second] = first.edit().todos;
    let editing = second.edit();
    it("stops editing", () => {
      let [first] = editing.todos;
      let [saved, stillEditing, unchanged] = first.save().todos
      expect(saved.editing.state).toBe(false);
      expect(stillEditing.editing.state).toBe(true);
      expect(unchanged.editing.state).toBe(false);            
    });
  });
});
