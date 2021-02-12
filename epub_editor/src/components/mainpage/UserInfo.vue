<template>
  <v-dialog
    v-model="userInfoDialog"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <Alert/>
    <v-card>
      <v-toolbar
        dark
        color="#6A68A6"
        class="rounded-0"
      >
        <v-toolbar-title>User Information</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon
            dark
            @click="$emit('close', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-layout justify-center class="mt-5">
        <v-card flat width="600">
          <v-card-text class="pa-0">

            <!-------------- 회원 정보 -------------->
            <div class="mt-7 mb-9">
              <h2 class="mb-3" style="color: #6A68A6;">이메일</h2>
              <h3>{{ email }}</h3>
            </div>
            <div class="mb-9">
              <h2 class="mb-3" style="color: #6A68A6;">이름</h2>
              <h3>{{ name }}</h3>
            </div>
            <div class="mb-9">
              <v-container>
                <v-row class="mb-5" style="color: #6A68A6;">
                  <h2 class="mr-2">닉네임</h2>
                  <v-icon @click="changeNN=!changeNN">mdi-pencil-outline</v-icon>
                </v-row>
                <v-row v-if="!changeNN">
                  <h3>{{ nickname }}</h3></v-row>
                <v-row v-else>
                  <v-text-field
                    placeholder="변경할 닉네임을 입력해주세요"
                    dense
                    class="mr-3"
                    v-model="newNickname"
                  ></v-text-field>
                  <v-btn text outlined @click="sendNickname" style="color: #6A68A6;">변경</v-btn>
                </v-row>
              </v-container>
            </div>

            <!-------------- 정보 변경 -------------->
            <v-divider></v-divider>
            <div class="mt-7">
              <v-container>
                <v-row class="mb-5">
                  <h2 class="mr-2" style="color: #6A68A6;">비밀번호 변경</h2>
                  <v-icon @click="changePW=!changePW">mdi-pencil-outline</v-icon>
                </v-row>
                <div v-if="changePW">
                  <v-row class="mb-2">
                    <v-text-field
                      placeholder="현재 비밀번호"
                      dense
                      class="mr-3"
                    ></v-text-field>
                  </v-row>
                  <v-row class="mb-4">
                    <v-text-field
                      placeholder="새 비밀번호"
                      dense
                      class="mr-3"
                    ></v-text-field>
                    <v-text-field
                      placeholder="비밀번호 확인"
                      dense
                      class="mr-3"
                    ></v-text-field>
                    <v-btn text outlined @click="sendPassword" style="color: #6A68A6;">변경</v-btn>
                  </v-row>
                </div>
              </v-container>
            </div>
          </v-card-text>

          <!-------------- 회원 탈퇴 -------------->
          <v-divider></v-divider>
          <v-card-actions class="pt-0 pl-0">
            <v-btn text class="pa-0" @click="signout" style="color: red !important;">탈퇴하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Alert from "@/components/mainpage/Alert"
export default {
  name: 'UserInfo',
  data: function () {
    return {
      // dialog 띄우기
      show: this.userInfoDialog,

      // load할 데이터
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      nickname: localStorage.getItem('nickname'),

      // 변경된 데이터
      newNickname: '',

      // 변경 창 토글
      changeNN: false,
      changePW: false,
    }
  },
  props: {
    userInfoDialog: Boolean
  },
  components: {
    Alert
  },
  methods: {
    // 닉네임 변경 함수
    sendNickname: function () {
      const data = {'email': this.email, 'nickname': this.newNickname}
      axios.put("https://contact.dabook.site/api/user/nickname", data)
        .then(res => {
          const message = res.data;
          if (message === "SUCCESS_CHANGE_NICKNAME") { // 닉네임 변경 성공시
            this.changeNN = false;
            localStorage.setItem('nickname', this.newNickname)
            this.nickname = localStorage.getItem('nickname')
            this.$store.dispatch("setAlertMessage", "success.save-ebook");
          } else {    // 닉네임 중복시
            this.$store.dispatch("setAlertMessage", "이미 존재하는 닉네임입니다.");
          }
        })
        .catch(err => { console.log(err) })
    },
    sendPassword: function () {

    },
    signout: function () {
      
    }
  }
}
</script>

<style>

</style>