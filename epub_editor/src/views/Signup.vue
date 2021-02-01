<template>
  <div>
    <v-card class="ma-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>Signup</span>
      </v-card-title>
      <v-window>
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-btn @click="emailConfirm">이메일 인증</v-btn>
            <v-text-field
              label="Name"
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Nickname"
              v-model="nickname"
            ></v-text-field>
            <v-btn @click="nicknameConfirm">닉네임 인증</v-btn>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <v-text-field
              label="PasswordConfirm"
              type="Password"
              v-model="passwordConfirm"
            ></v-text-field>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      <v-checkbox
        v-model="checkbox"
        label="Do you agree?"
      ></v-checkbox>
      <v-card-actions>
        <v-btn @click="signUp">SIGNUP</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
  data: () => ({
    name: '',
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    checkbox: false,
  }),
  methods: {
    signUp: function () {
    const data = { 'email': this.email, 'epubList': [], 'nickname': this.nickname, 'password': this.password, 'status': true }
    axios.post('http://i4a103.p.ssafy.io/api/user', data)
      .then(res => {
        console.log(res)
        this.$router.push({ name: 'Login'})
      })
      .catch(err => console.log(err))
    },
    emailConfirm: function () {
      axios.get(`http://i4a103.p.ssafy.io/api/user/email/${this.email}`)
        .then(res => console.log(res))  //false - 이미 이메일 존재
        .catch(err => console.log(err))
    },
    nicknameConfirm: function () {
      axios.get(`http://i4a103.p.ssafy.io/api/user/nickname/${this.nickname}`)
        .then(res => console.log(res))  //false - 닉네임 이미 존재
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>
</style>