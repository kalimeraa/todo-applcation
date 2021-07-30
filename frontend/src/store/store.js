import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [],
        error: ""
    },
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos;
        },

        SET_ERROR(state, error) {
            state.error = error;
        },

        ADD_TODO(state, todo) {
            state.todos.push(todo);
        }
    },
    actions: {
        async fetchTodos({commit}) {
            const res = await axios.get("/api/todos");

            commit("SET_TODOS", res.data);
        },
        async addTodo({commit}, todo) {
            try {
                const createdTodo = await axios.post(`/api/todos/create`, {todo});
                commit("ADD_TODO", createdTodo.data);
            } catch (e) {
                console.log(e.toString());
                commit("SET_ERROR", e.response.data.errors[0].msg);
            }
        },
        async flushError({commit}) {
            commit("SET_ERROR", "");
        }
    },
    getters: {
        todos: state => state.todos,
        error: state => state.error
    }
});
