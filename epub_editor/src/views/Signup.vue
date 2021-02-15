<template>
  <v-container fluid fill-height class="pa-0 bg">
    <!---------------Alert 창-------------------->
    <v-row>
      <v-alert text dense class="mt-3" style="width:100%;" icon="mdi-alert-circle-outline" :color="color" v-if="type">
        {{ message }}
      </v-alert>
    </v-row>
    
    <!---------------Signup form----------------->
    <v-layout align-center justify-center>
      <v-card flat :loading="loading" width="500">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="7"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-card-text>
          <v-container>
            <v-row>
              <v-icon @click="back">mdi-arrow-left</v-icon>
            </v-row>
            <v-row>
              <v-card-text align="center" class="mb-6">
                <h1 style="color: #6A68A6;">Signup</h1>
              </v-card-text>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-3">mdi-email-outline</v-icon>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-btn outlined style="color: #6A68A6;" @click="emailConfirm">Check</v-btn>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-3">mdi-account</v-icon>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="rules"
              ></v-text-field>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-3">mdi-emoticon-happy-outline</v-icon>
              <v-text-field
                label="Nickname"
                v-model="nickname"
                :rules="rules"
              ></v-text-field>
              <v-btn outlined style="color: #6A68A6;" @click="nicknameConfirm">Check</v-btn>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-3">mdi-lock-outline</v-icon>
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
            <v-row class="mb-4">
              <v-container pa-0>
                <v-checkbox v-model="checkbox">
                  <template v-slot:label>
                    <div>
                      I agree about
                      <a
                        target="_blank"
                        href="https://contact.dabook.site/privacy.html"
                        @click.stop
                        style="color: #6A68A6;"
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </template>
                </v-checkbox>
              </v-container>
            </v-row>
            <v-row>
              <v-btn block class="mb-1" @click="signUp" :disabled="disabled" style="background-color: #6A68A6; color: #ffffff;">SIGNUP</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
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
    color: null,
    elapse:null,

    // loaging
    loading: false,
    disabled: false,

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

    // 뒤로가기 (Login 창으로 이동)
    back: function () {
      this.$router.push({ name: 'Login'})
    },

    // 회원가입 
    signUp: function () {
      const data = { 'email': this.email, 'name': this.name, 'epubList': [], 'nickname': this.nickname, 'password': this.password, 'status': false }

      if (this.password === this.passwordConfirm) {
        if (this.checkbox === true) {
          this.loading = true;
          this.disabled = true;
          axios.post("https://contact.dabook.site/api/user", data) 
            .then(res => {
              console.log(res)
              this.$router.push({ name: 'Login'})
            })
            .catch(err => console.log(err))
        }
        else {
          this.message = '약관에 동의해주십시오.'
          this.showAlert('error')
          this.color = '#EF5350'
        }
      }
      else {
        this.message = '비밀번호가 맞지 않습니다!'
        this.showAlert('error')
        this.color = '#EF5350'
      }
    },

    // 이메일 중복 확인
    emailConfirm: function () {  //false - 이미 이메일 존재
      axios.get(`https://contact.dabook.site/api/user/email/${this.email}`)
        .then(res => {
          if (res.data === false) {
            this.message = '이메일이 이미 존재합니다!'
            this.showAlert('error')
            this.color = '#EF5350'
          }
          else {
            this.message = '사용 가능한 이메일입니다!'
            this.showAlert('success')
            this.color = '#D1C4E9'
          }
        })
        .catch(err => console.log(err))
    },

    //닉네임 중복 확인
    nicknameConfirm: function () {  //false - 닉네임 이미 존재
      axios.get(`https://contact.dabook.site/api/user/nickname/${this.nickname}`)
        .then(res => {
          if (res.data === false) {
            this.message = '닉네임이 이미 존재합니다!'
            this.showAlert('error')
            this.color = '#EF5350'
          }
          else {
            this.message = '사용할 수 있는 닉네임입니다!'
            this.showAlert('success')
            this.color = '#D1C4E9'
          }
        })
        .catch(err => console.log(err))
    },
  }
}
</script>