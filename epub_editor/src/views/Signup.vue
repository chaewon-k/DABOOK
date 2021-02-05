<template>
  <v-container fluid fill-height>
    <!---------------Alert 창-------------------->
    <v-row>
      <v-alert outlined dense style="width:100%;" icon="mdi-alert-circle-outline" :color="type" v-if="type">
        {{ message }}
      </v-alert>
    </v-row>
    
    <!---------------Signup form----------------->
    <v-layout align-center justify-center>
      <v-card width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Signup</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-btn @click="emailConfirm">이메일 인증</v-btn>
            </v-row>
            <v-row class="my-3">
              <v-text-field
                label="Name"
                v-model="name"
                :rules="rules"
              ></v-text-field>
            </v-row>
            <v-row class="my-3">
              <v-text-field
                label="Nickname"
                v-model="nickname"
                :rules="rules"
              ></v-text-field>
              <v-btn @click="nicknameConfirm">닉네임 중복확인</v-btn>
            </v-row>
            <v-row class="my-3">
              <v-text-field
                class="mr-2"
                label="Password"
                type="password"
                v-model="password"
                :rules="rules"
              ></v-text-field>
              <v-text-field
                class="ml-2"
                label="PasswordConfirm"
                type="Password"
                v-model="passwordConfirm"
                :rules="rules"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-checkbox
          v-model="checkbox"
          label="Do you agree?"
        ></v-checkbox>
        <v-card-actions>
          <v-btn @click="signUp">SIGNUP</v-btn>
          <router-link :to="{name:'Login'}"><v-btn>Back</v-btn></router-link>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
  data: () => ({
    // 서버에 보낼 데이터
    name: '',
    email: '',
    nickname: '',
    password: '',

    // 정보 확인용 데이터
    passwordConfirm: '',
    checkbox: false,

    // Alert 용 데이터
    message: '',
    type: null,
    elapse:null,

    // 각 데이터별 기본 규칙
    rules: [
        value => !!value || 'Required.',
    ],
    emailRules: [
      value => /.+@.+\..+/.test(value) || "E-mail must be valid"
    ]
  }),
  methods: {
    // 3초 후 사라지는 alert 구현 함수
    showAlert (type) {
      this.type = type
      let timer = this.showAlert.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.showAlert.timer = setTimeout(() => {
          this.type = null
      }, 3000)
      
      this.elapse = 1 
      let t = this.showAlert.t
      if (t) {
        clearInterval(t)
      }
      
      this.showAlert.t = setInterval(() => {
        if (this.elapse === 3) {
          this.elapse = 0
          clearInterval(this.showAlert.t)
        }
        else {
          this.elapse++
        }
      }, 1000)
    },

    // 회원가입 
    signUp: function () {
      const data = { 'email': this.email, 'epubList': [], 'nickname': this.nickname, 'password': this.password, 'status': false }
      if (this.password === this.passwordConfirm) {
        if (this.checkbox === true) {
          axios.post("https://i4a103.p.ssafy.io/api/user", data)
            .then(res => {
              console.log(res)
              this.$router.push({ name: 'Login'})
            })
            .catch(err => console.log(err))
        }
        else {
          this.message = '약관에 동의해주십시오.'
          this.showAlert('error')
        }
      }
      else {
        this.message = '비밀번호가 맞지 않습니다!'
        this.showAlert('error')
      }
    },

    // 이메일 중복 확인
    emailConfirm: function () {  //false - 이미 이메일 존재
      axios.get(`https://i4a103.p.ssafy.io/api/user/email/${this.email}`)
        .then(res => {
          if (res.data === false) {
            this.message = '이메일이 이미 존재합니다!'
            this.showAlert('error')
          }
          else {
            this.message = '사용 가능한 이메일입니다!'
            this.showAlert('purple')
          }
        })
        .catch(err => console.log(err))
    },

    //닉네임 중복 확인
    nicknameConfirm: function () {  //false - 닉네임 이미 존재
      axios.get(`https://i4a103.p.ssafy.io/api/user/nickname/${this.nickname}`)
        .then(res => {
          if (res.data === false) {
            this.message = '닉네임이 이미 존재합니다!'
            this.showAlert('error')
          }
          else {
            this.message = '사용할 수 있는 닉네임입니다!'
            this.showAlert('purple')
          }
        })
        .catch(err => console.log(err))
    },
  }
}
</script>