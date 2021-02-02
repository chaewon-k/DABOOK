<template>
  <div>
    <!---------------Alert 창-------------------->
    <v-alert outlined dense icon="mdi-alert-circle-outline" :color="type" v-if="type">
      {{ message }}
    </v-alert>
    <!---------------login form------------------>
    <v-card class="ma-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              label="Email"
              v-model="inputEmail"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Password"
              type="password"
              v-model="inputPassword"
            ></v-text-field>
          </v-row>
        </v-container>
        <!-------------비밀번호 찾기 ----------------->
        <div class="float-right">
          <p>비밀번호를 잊으셨나요?</p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="logIn">LOGIN</v-btn>
        <v-btn @click="signUp">SIGNUP</v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
        elapse:null,
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
        axios.post("https://i4a103.p.ssafy.io/api/login", data)
          .then(res => {
            const message = res.data.result
            if (message === "ERROR_ID"){
              this.message = '존재하지 않는 ID입니다.'
              this.showAlert('error')
            }
            else if (message === "ERROR_STATUS"){
              this.message = '이메일 인증을 해주세요.'
              this.showAlert('error')
            }
            else if (message === "ERROR_PASSWORD"){
              this.message = '존재하지 않는 비밀번호입니다.'
              this.showAlert('error')
            }
            else {
              console.log(message)
              this.$router.push({ name: 'Editor'})
            }
          })
          .catch(err => console.log(err))
      },

      // 회원가입 창으로 이동
      signUp: function () {
        this.$router.push({ name: 'Signup'})
      }
    }
  }
</script>