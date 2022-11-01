import * as z from "zod";
import { onMounted, ref, computed } from "vue"

const TodoSchema = z.object({
  title: z.string(),
  finished: z.boolean()
})

type Todo = z.infer<typeof TodoSchema>

const key = "todos" 
const loadTodos = () => {
  try{
    const todos = localStorage.getItem(key) 

    if(todos === null ){
      return []
    }

    return z.array(TodoSchema).parse(JSON.parse(todos))
  } catch {
    return []
  }
}

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(todos))
}

export const useTodo = () => {
  const temp = ref<string>("")

  const todos = ref<Todo[]>([])

  onMounted( () => {
    const savedTodos = loadTodos()
    if(saveTodos.length === 0 ){
      todos.value = [
        {
          title: "one",
          finished: false
        },
        {
          title: "two",
          finished: true
        },
        {
          title: "three",
          finished: true
        }
      ]
    }else{
      todos.value = savedTodos
    }
  })

  const disabled = computed( () => !temp.value)

  const isEmpty = computed( () => todos.value.length === 0 )

  const addTodo = () => {
    if(!temp.value){
      return;
    }

    if(todos.value.find( todo => todo.title === temp.value)){
      return;
    }

    todos.value = [
      ...todos.value,
      {
        title: temp.value,
        finished: false
      }
    ]

    saveTodos(todos.value)
    temp.value = ""
  }

  const checkTodo = (idx: number) => {
    todos.value[idx].finished = !todos.value[idx].finished
  }

  const removeTodo = (idx: number) => {
    todos.value.splice(idx,1)
    saveTodos(todos.value)
  }

  return {
    temp,
    todos,
    disabled,
    isEmpty,
    addTodo,
    checkTodo,
    removeTodo
  }
}