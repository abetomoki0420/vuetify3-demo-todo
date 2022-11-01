<script setup lang="ts">
import { useTodo } from "@/composables/todo";

const { temp, disabled, isEmpty, todos, addTodo, checkTodo, removeTodo } =
  useTodo();
</script>

<template>
  <div class="pa-4">
    <h1 class="text-h1 font-weight-bold">Todo</h1>
    <v-form>
      <v-responsive max-width="320">
        <v-text-field v-model="temp" clearable />
      </v-responsive>
      <v-btn :disabled="disabled" color="primary" @click="addTodo"
        >submit</v-btn
      >
    </v-form>
    <v-list class="mt-2">
      <v-list-item v-for="({ title, finished }, index) in todos" :key="index">
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-checkbox-btn :model-value="finished" @click="checkTodo(index)">
            </v-checkbox-btn>
          </v-list-item-action>

          <div
            class="title"
            :class="{ 'text-decoration-line-through': finished }"
          >
            {{ title }}
          </div>

          <v-list-item-action end>
            <v-btn icon variant="plain" @click="removeTodo(index)">
              <v-icon icon="mdi-close"></v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
    <p v-if="isEmpty">Please input a your todo task.</p>
  </div>
</template>

<style scoped>
.title {
  width: 10rem;
}
</style>
