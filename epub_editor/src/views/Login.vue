<template>
  <v-container fluid fill-height class="pa-0 bg">
    <!---------------Alert 창-------------------->
    <v-row>
      <v-alert text dense class="mt-3" style="width:100%;" icon="mdi-alert-circle-outline" :color="color" v-if="type">
        {{ message }}
      </v-alert>
    </v-row>
    
    <!---------------login form------------------>
    <v-layout align-center justify-center>
      <v-card flat width="500">
        <v-card-text>
          <v-container>
            <v-row>
              <v-card-text align="center" class="mb-6">
                <h1 style="color: #6A68A6;">Login</h1>
              </v-card-text>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-3">mdi-email-outline</v-icon>
              <v-text-field
                label="Email"
                v-model="inputEmail"
              ></v-text-field>
            </v-row>
            <v-row class="mb-1">
              <v-icon class="mr-3">mdi-lock-outline</v-icon>
              <v-text-field
                label="Password"
                type="password"
                v-model="inputPassword"
              ></v-text-field>
            </v-row>

            <!-------------비밀번호 찾기 ----------------->
            <v-row justify="end">
              <a class="float-right" style="color: #6A68A6" @click="findPassword">Forgot password?</a>
            </v-row>

            <!----------------- buttons ----------------->
            <v-row class="mt-7">
              <v-btn block @click="logIn" style="background-color: #6A68A6; color: #ffffff;">LOGIN</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pt-0">
          <p class="ma-auto">
            Don't have an account?
            <v-btn text @click="signUp" style="color: #6A68A6;">SIGNUP</v-btn>
          </p>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data: function () {
    return {
      // 서버에 보낼 데이터
      inputEmail: '',
      inputPassword: '',

      // Alert 용 데이터
      message: '',
      type: null,
      color: null,
      elapse:null,

      // 로그인 
      signedIn: false
    }
  },
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

    // 로그인 
    logIn: function () {
      const data = {"email" : this.inputEmail, "password" : this.inputPassword}
      axios.post("https://contact.dabook.site/api/login", data)
        .then(res => {
          const message = res.data.result
          if (message === "ERROR_ID"){
            this.message = '존재하지 않는 ID입니다.'
            this.showAlert('error')
            this.color = '#EF5350'
          }
          else if (message === "ERROR_STATUS"){
            this.message = '이메일 인증을 해주세요.'
            this.showAlert('error')
            this.color = '#EF5350'
          }
          else if (message === "ERROR_PASSWORD"){
            this.message = '존재하지 않는 비밀번호입니다.'
            this.showAlert('error')
            this.color = '#EF5350'
          }
          else {
            // local Storage에 로그인 정보 저장.
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('name', res.data.name)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('nickname', res.data.nickname)
            this.$router.push({ name: 'Editor'})
          }
        })
        .catch(err => console.log(err))
    },

    // 회원가입 창으로 이동
    signUp: function () {
      this.$router.push({ name: 'Signup'})
    },

    // 임시 비밀번호 발급
    findPassword: function () {
      if (this.inputEmail === '') {
        this.message = '이메일을 입력해주세요!'
        this.showAlert('error')
        this.color = '#EF5350'
      }
      else {
        axios.get(`https://contact.dabook.site/password?email=${this.inputEmail}`)
          .then(res =>{
            console.log(res)
          })
          .catch(err => console.log(err))
        this.message = '해당 이메일로 임시 비밀번호를 전송했습니다.'
        this.showAlert('success')
        this.color = '#D1C4E9'
      }
    },
  }
}
</script>
<style>
.bg {
  background-image: url('../assets/accountImg/background.png');
  background-size: 100% 100%;
}
</style>