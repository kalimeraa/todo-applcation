import { shallowMount, createLocalVue } from "@vue/test-utils";
import ToDo from "../../src/components/ToDo";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

let wrapper = null;
describe("Getters", () => {
  describe("with a store", () => {
    let store;
    let getters;
    let actions;
    beforeEach(() => {
      getters = {
        todos: () => [
          {
            _id: "1",
            todo: "hello"
          }
        ],
        error: () => ""
      };

      actions = {
        fetchTodos: ()=>{}
      };

      store = new Vuex.Store({ getters,actions });
      wrapper = shallowMount(ToDo, {
        store,
        localVue
      });
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it("renders todo value from todo list getter", () => {
      const todoListText = wrapper.find("li.todo-list").text();
      expect(todoListText).toEqual("hello");
    });

    it("error should be empty", () => {
      const errorText = wrapper.find("h3#error").text();
      expect(errorText).toEqual("");
    });

    it("renders an error", () => {
      getters = {
        todos: () => [],
        error: () => "todo is required"
      };
      actions = {
        fetchTodos: ()=>{}
      };
      store = new Vuex.Store({ getters,actions });
      wrapper = shallowMount(ToDo, {
        store,
        localVue
      });
      const errorText = wrapper.find("h3#error").text();
      expect(errorText).toEqual("todo is required");
    });

    it("renders There is no Todo", () => {
      getters = {
        todos: () => [],
        error: () => ""
      };
      actions = {
        fetchTodos: ()=>{}
      };
      store = new Vuex.Store({ getters,actions });
      wrapper = shallowMount(ToDo, {
        store,
        localVue
      });
      const todoListText = wrapper.find("li.empty-todo").text();
      expect(todoListText).toEqual("There is no Todo");
    });
  });
});
