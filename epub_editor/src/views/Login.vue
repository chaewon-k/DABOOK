<template>
  <v-container fluid fill-height>
    <!---------------Alert 창-------------------->
    <v-row>
      <v-alert outlined dense style="width:100%;" icon="mdi-alert-circle-outline" :color="type" v-if="type">
        {{ message }}
      </v-alert>
    </v-row>
    
    <!---------------login form------------------>
    <v-layout align-center justify-center>
      <v-card width="500">
        <v-card-text>
          <v-container>
            <v-row>
              <v-card-text align="center" class="mb-6">
                <h1>Login</h1>
              </v-card-text>
            </v-row>
            <v-row>
              <v-icon class="mr-3">mdi-email-outline</v-icon>
              <v-text-field
                label="Email"
                v-model="inputEmail"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-icon class="mr-3">mdi-lock-outline</v-icon>
              <v-text-field
                label="Password"
                type="password"
                v-model="inputPassword"
              ></v-text-field>
            </v-row>

            <!-------------비밀번호 찾기 ----------------->
            <v-row justify="end">
              <v-btn text class="float-right" @click="findPassword">비밀번호를 잊으셨나요?</v-btn>
            </v-row>

            <!----------------- buttons ----------------->
            <v-row class="mt-7">
              <v-btn block @click="logIn">LOGIN</v-btn>
            </v-row>
            <v-row>
              <v-btn block class="my-5" :disabled="signedIn" @click="handleLogin"><v-icon>mdi-google</v-icon>oogle</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <p class="ma-auto">Don't have an account?<v-btn text @click="signUp">SIGNUP</v-btn></p>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';
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
            console.log(res)
            // local Storage에 로그인 정보 저장.
            localStorage.setItem('token',res.data.token)
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
      axios.get(`https://contact.dabook.site/password?email=${this.inputEmail}`)
        .then(res =>{
          console.log(res)
        })
        .catch(err => console.log(err))
      this.message = '해당 이메일로 임시 비밀번호를 전송했습니다.'
      this.showAlert('purple')
    },

    // 구글 로그인 연동
    handleLogin: function () {
      const client = '613406129704-omk18m4bqaei962v5s2hsn654cj2den2.apps.googleusercontent.com'
      const myApiOauth = new ElectronGoogleOAuth2(
        client,
        'FHTLcGOSPrgC0c9CNtSmj43U',
        ['https://www.googleapis.com/auth/drive.metadata.readonly']
      );
    
      myApiOauth.openAuthWindowAndGetTokens()
        .then(token => {
          console.log(token)
        });
    }
  }
}
</script>