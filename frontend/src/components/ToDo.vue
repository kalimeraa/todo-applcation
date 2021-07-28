<template>
  <div class="container-fluid">
    <header><h1>Todo App</h1></header>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <label for="todo" class="form-label">Add Todo</label>
            <input
              id="todo"
              v-model="todoText"
              class="form-control"
              placeholder="prepare a cup of coffee"
            />
            <button
              id="addTodo"
              v-on:click="addTodo"
              type="button"
              class="btn btn-success"
            >
              <span class="ml-2">Add</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <h3 id="error">{{this.error}}</h3>
            <ul class="list-group" v-if="this.todos.length > 0">
              <li
                class="list-group-item todo-list"
                :key="todo._id"
                v-for="todo in todos"
              >
                {{ todo.todo }}
              </li>
            </ul>
            <ul class="list-group" v-else>
              <li class="list-group-item empty-todo">There is no Todo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      todoText: ""
    };
  },
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this.todoText);
      this.todoText = "";
      this.$store.dispatch("flushError");
    }
  },
  computed: {
    ...mapGetters({
      todos: "todos",
      error: "error"
    })
  },
  created() {
    this.$store.dispatch("fetchTodos");
  }
};
</script>
<style></style>
