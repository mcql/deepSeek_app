<script setup>
import {ref} from 'vue'

defineProps({
  msg: String,
})

const emit = defineEmits(['success', 'error'])
const promiseFun = () => {
  return new Promise((resolve, reject) => {
    if (count.value === 0) {
      resolve(count)
    } else {
      reject('error')
    }
  })
}

const getPromiseFun = async () => {
  try {
    await promiseFun()
    try {
      emit('success')
    } catch (err) {
      console.log(err)
    }
  } catch (error) {
    emit('error')
  }
}


const count = ref(0)
</script>

<template>
  <h1 @click="getPromiseFun">{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
    >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
        href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
        target="_blank"
    >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
