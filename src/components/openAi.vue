<template>
  <section class="open-ai">
    <ul class="open-ai__list">
      <li v-for="(item, index) in answers" :key="index" :class="[item.role === 'user' ? 'left' : 'right', 'content']">
        <div class="data">
          {{ item.content }}
          <img v-if="item.role === 'assistant'" class="img" src="https://cdn.deepseek.com/platform/favicon.png" alt="">
        </div>
      </li>
    </ul>
    <div class="operation">
      <el-input type="textarea" v-model="answer" placeholder="请输入问题"/>
      <el-button class="btn" @click="submit">提交</el-button>
    </div>
  </section>
</template>


<script setup>
import OpenAI from "openai";
import {ref} from 'vue'
import {ElMessageBox} from 'element-plus'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true
});
const answers = ref([])
const questions = ref('')
const answer = ref('')
const submit = async () => {
  answers.value.push({role: 'user', content: answer.value})
  try {
    const completion = await openai.chat.completions.create({
      messages: answers.value,
      model: "deepseek-chat",
    });
    questions.value = completion.choices[0].message.content
    answers.value.push({role: 'assistant', content: questions.value})
    answer.value = ''
  } catch (error) {
    await ElMessageBox.alert(error)
  }
}
</script>

<style scoped>
.open-ai {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.open-ai__list {
  height: 100%;
}

.operation {
  flex-shrink: 0;
  background: rgb(216.8, 235.6, 255);
  padding: 20px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.btn {
  width: 120px;
  margin-top: 10px;
}

.content {
  line-height: 1.5;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.img {
  width: 24px;
  height: 24px;
  margin-left: 6px;
}

.data {
  width: 80%;
  padding: 0 10px;
}

.left {
  align-items: flex-start;
}

.right {
  align-items: flex-end;
  background: #eaeaea;
  padding: 10px 0;
  border-radius: 8px;
}

.right .data {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>