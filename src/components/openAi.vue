<template>
  <section class="open-ai" v-loading="loading">
    <ul class="open-ai__list">
      <li v-for="(item, index) in answers.filter(ele => ele.role !== 'system')" :key="index" :class="[item.role === 'user' ? 'left' : 'right', 'content']">
        <div class="data">
          <template v-if="item.role === 'user'">{{ item.content }}</template>
          <template v-else>
            <Viewer :value="item.content" style="width: 100%" :plugins="plugins"  />
            <img v-if="item.role === 'assistant'" class="img" src="https://cdn.deepseek.com/platform/favicon.png" alt="">
          </template>
        </div>
      </li>
    </ul>
    <div class="operation">
      <el-input type="textarea" v-model="answer" placeholder="请输入问题" @keyup.enter.native="submit" />
      <el-button class="btn" @click="submit">提交</el-button>
    </div>
  </section>
</template>


<script setup>
import OpenAI from "openai";
import {ref} from 'vue'
import {ElMessageBox} from 'element-plus'

import "bytemd/dist/index.css";
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import highlight from "@bytemd/plugin-highlight";
import gemoji from "@bytemd/plugin-gemoji";
import "github-markdown-css";
import "highlight.js/styles/github.css";
const plugins = [gfm(), highlightSsr(), gemoji()];

const loading = ref(false);
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true
});
const answers = ref([
  {"role": "system", "content": "你是一位前端程序员，你的回答应当偏向javaScript语言，并以`frontend:`开头"},
])
const questions = ref('')
const answer = ref('')
const submit = async () => {
  if (!answer.value) return
  answers.value.push({role: 'user', content: answer.value})
  try {
    loading.value = true
    const completion = await openai.chat.completions.create({
      messages: answers.value,
      model: "deepseek-chat",
    });
    questions.value = completion.choices[0].message.content
    answers.value.push({role: 'assistant', content: questions.value})
    answer.value = ''
  } catch (error) {
    await ElMessageBox.alert(error)
  } finally {
    loading.value = false
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
  overflow: auto;
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
  padding: 10px 0;
  border-radius: 8px;
}

.right .data {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>