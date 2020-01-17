<template comment>
  <div class="hello">
    <header>
      <!-- 测试HTML注释可用性 -->
      <section>
        <form id="form" @submit.prevent>
          <label for="title">ToDoList</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="添加ToDo"
            required="required"
            autocomplete="off"
            v-model="todoItem"
            @keyup.enter="addItem"
          />
        </form>
      </section>
    </header>
    <section>
      <h2>
        正在进行
        <span id="todocount">{{todoCount}}</span>
      </h2>
      <ol id="todolist" class="demo-box">
        <li v-for="item in todoList" :key="item.text">
          <input type="checkbox" v-model="item.hasDone" @change="update(item.text,item.hasDone)"/>
          <p>{{item.text}}</p>
          <a href="javascript:" @click.prevent="remove(item.text)">-</a>
        </li>
      </ol>
      <h2>
        已经完成
        <span id="donecount">{{doneCount}}</span>
      </h2>
      <ul id="donelist">
        <li v-for="item in doneList" :key="item.text">
           <input type="checkbox" v-model="item.hasDone" @change="update(item.text,item.hasDone)"/>
          <p>{{item.text}}</p>
          <a href="javascript:" @click.prevent="remove(item.text)">-</a>
        </li>
      </ul>
    </section>
    <footer>
      Copyright © 2014 todolist.cn
      <a href="javascript:" @click.prevent="clear">clear</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import storage from "@/until/storage.ts";

@Component
export default class HelloWorld extends Vue {
  list: Array<any> = [];
  todoItem: String = "";
  get todoList(): Array<any> {
    return this.list.filter(item => !item.hasDone);
  }
  get doneList(): Array<any> {
    return this.list.filter(item => item.hasDone);
  }
  get todoCount(): Number {
    return this.todoList.length;
  }
  get doneCount(): Number {
    return this.doneList.length;
  }
  @Emit()
  addItem(): void {
    let text: String = this.todoItem;
    for (let i = 0, length = this.list.length; i < length; i++) {
      if (this.list[i].text == text) {
        alert("重复的待办事项！");
        this.todoItem = "";
        return;
      }
    }
    this.list.push({
      text: text,
      hasDone: false
    });
    storage.setItem('todolist',this.list);
    this.todoItem = "";
  }
  @Emit()
  update(text: string,hasDone:boolean): void {
    this.list.forEach(item => {
      if(item.text==text){
        item.hasDone = hasDone;
      }
    });
    storage.setItem('todolist',this.list);
  }
  @Emit()
  remove(text: string): void {
    this.list = this.list.filter(item => item.text !== text);
    storage.setItem('todolist',this.list);
  }
  @Emit()
  clear(): void {
    this.list = [];
    storage.removeItem('todolist');
  }
  mounted() {
    let list = storage.getItem("todolist");
    if(Array.isArray(list)){
      this.list = list;
    }else{
      storage.setItem('todolist',this.list);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #cdcdcd;
}
header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}
section {
  margin: 0 auto;
}
label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
header input {
  float: right;
  width: 60%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),
    0 1px 6px rgba(0, 0, 0, 0.45) inset;
  border: none;
}
input:focus {
  outline-width: 0;
}
h2 {
  position: relative;
  text-align: left;
}
span {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  padding: 0 5px;
  height: 20px;
  border-radius: 20px;
  background: #e6e6fa;
  line-height: 22px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
ol,
ul {
  padding: 0;
  list-style: none;
}
li input {
  position: absolute;
  top: 2px;
  left: 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}
p {
  margin: 0;
  text-align: left;
}
li p input {
  top: 3px;
  left: 40px;
  width: 70%;
  height: 20px;
  line-height: 14px;
  text-indent: 5px;
  font-size: 14px;
}
li {
  height: 32px;
  line-height: 32px;
  background: #fff;
  position: relative;
  margin-bottom: 10px;
  padding: 0 45px;
  border-radius: 3px;
  border-left: 5px solid #629a9c;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}
ol li {
  cursor: move;
}
ul li {
  border-left: 5px solid #999;
  opacity: 0.5;
}
li a {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  width: 14px;
  height: 12px;
  border-radius: 14px;
  border: 6px double #fff;
  background: #ccc;
  line-height: 14px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
footer {
  color: #666;
  font-size: 14px;
  text-align: center;
}
footer a {
  color: #666;
  text-decoration: none;
  color: #999;
}
@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}
@media screen and (min-width: 620px) {
  section {
    width: 600px;
    padding: 0 10px;
  }
}
</style>
