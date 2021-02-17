<template>
  <v-dialog
    v-model="userInfoDialog"
    fullscreen
  >
    <Alert/>
    <v-card>
      <v-toolbar
        dark
        color="#6A68A6"
        class="rounded-0"
      >
        <v-toolbar-title>{{ $t("userinfotab.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon
            dark
            @click="closeDialog"
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
              <h2 class="mb-3" style="color: #9C9BBF;">{{ $t("userinfotab.email") }}</h2>
              <h3>{{ email }}</h3>
            </div>
            <div class="mb-9">
              <h2 class="mb-3" style="color: #9C9BBF;">{{ $t("userinfotab.name") }}</h2>
              <h3>{{ name }}</h3>
            </div>
            <div class="mb-9">
              <v-container>
                <v-row class="mb-5">
                  <h2 class="mr-2" style="color: #9C9BBF;">{{ $t("userinfotab.nickname") }}</h2>
                  <v-icon @click="changeNN=!changeNN" style="color: #6A68A6;">mdi-pencil-outline</v-icon>
                </v-row>
                <v-row v-if="!changeNN">
                  <h3>{{ nickname }}</h3></v-row>
                <v-row v-else>
                  <v-text-field
                    :placeholder="this.GET_NN_PLACEHOLDER"
                    dense
                    class="mr-3"
                    v-model="newNickname"
                  ></v-text-field>
                  <v-btn text outlined @click="sendNickname" style="color: #6A68A6;">{{ $t("userinfotab.changebtn") }}</v-btn>
                </v-row>
              </v-container>
            </div>

            <!-------------- 정보 변경 -------------->
            <v-divider></v-divider>
            <div class="mt-7">
              <v-container>
                <v-row class="mb-5">
                  <h2 class="mr-2" style="color: #9C9BBF;">{{ $t("userinfotab.password-change") }}</h2>
                  <v-icon @click="changePW=!changePW" style="color: #6A68A6;">mdi-pencil-outline</v-icon>
                </v-row>
                <div v-if="changePW">
                  <v-row class="mb-2">
                    <v-text-field
                      :placeholder="this.GET_PREVPW_PLACEHOLDER"
                      dense
                      class="mr-3"
                      v-model="prevPassword"
                    ></v-text-field>
                  </v-row>
                  <v-row class="mb-4">
                    <v-text-field
                      :placeholder="this.GET_NEWPW_PLACEHOLDER"
                      dense
                      class="mr-3"
                      v-model="newPassword"
                    ></v-text-field>
                    <v-text-field
                      :placeholder="this.GET_PWCOMFIRM_PLACEHOLDER"
                      dense
                      class="mr-3"
                      v-model="passwordConfirm"
                    ></v-text-field>
                    <v-btn text outlined @click="sendPassword" style="color: #6A68A6;">{{ $t("userinfotab.changebtn") }}</v-btn>
                  </v-row>
                </div>
              </v-container>
            </div>
          </v-card-text>

          <!-------------- 회원 탈퇴 -------------->
          <v-divider></v-divider>
          <v-card-actions class="pt-0 pl-0">
            <v-spacer></v-spacer>
            <v-btn text class="pa-0" @click.stop="signoutDialog=true" style="color: red !important;">{{ $t("userinfotab.signout") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-card>

    <Confirm
      :dialog="signoutDialog"
      title="userinfotab.signouttab.title"
      content1="userinfotab.signouttab.content-1"
      content2="userinfotab.signouttab.content-2"
      confirm="userinfotab.signouttab.signout-btn"
      cancel="userinfotab.signouttab.cancel"
      @confirm="signout"
      @cancel="signoutDialog = false"
     />
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Alert from "@/components/mainpage/Alert"
import Confirm from "@/components/mainpage/Confirm"

export default {
  name: 'UserInfo',
  data: function () {
    return {
      // dialog 띄우기
      show: this.userInfoDialog,
      signoutDialog: false,

      // load할 데이터
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      nickname: localStorage.getItem('nickname'),

      // 변경될 데이터
      newNickname: '',
      prevPassword: '',
      newPassword: '',
      passwordConfirm: '',

      // 변경 창 토글
      changeNN: false,
      changePW: false,
    }
  },
  props: {
    // UserInfo.vue를 열고 닫는 변수
    userInfoDialog: Boolean
  },
  components: {
    Alert,
    Confirm
  },
  computed: {
    // placeholder의 한/영 버전을 위한 함수
    GET_NN_PLACEHOLDER () {
      return this.$t('userinfotab.NNplaceholder');
    },
    GET_PREVPW_PLACEHOLDER () {
      return this.$t('userinfotab.prevpassword');
    },
    GET_NEWPW_PLACEHOLDER () {
      return this.$t('userinfotab.newpassword');
    },
    GET_PWCOMFIRM_PLACEHOLDER () {
      return this.$t('userinfotab.passwordconfirm');
    }
  },
  methods: {
    closeDialog: function () {
      this.newNickname = '',
      this.prevPassword = '',
      this.newPassword = '',
      this.passwordConfirm = '',
      this.changeNN = false
      this.changePW = false
      this.$emit('close', false)
    },
    // 닉네임 변경 함수
    sendNickname: function () {
      const data = {'email': this.email, 'nickname': this.newNickname}
      axios.put("https://contact.dabook.site/api/user/nickname", data)
        .then(res => {
          const message = res.data;
          if (message === "SUCCESS_CHANGE_NICKNAME") { // 1. 닉네임 변경 성공
            this.changeNN = false;
            localStorage.setItem('nickname', this.newNickname)
            this.nickname = localStorage.getItem('nickname')
            this.$store.dispatch("setAlertMessage", "success.change-nickname");
          } else {    // 2. 닉네임 중복
            this.$store.dispatch("setAlertMessage", "error.duplicated-nickname");
          }
        })
        .catch(err => { console.log(err) })
    },

    // 비밀번호 변경 함수
    sendPassword: function () {
      if (this.newPassword !== this.passwordConfirm) {    // 1. 새 비밀번호가 일치하지 않음
        this.$store.dispatch("setAlertMessage", "error.not-match-newpassword");
      } else {
        const data = {'email': this.email, 'prevPassword': this.prevPassword, 'newPassword': this.newPassword}
        axios.put("https://contact.dabook.site/api/user/password", data)
          .then(res => {
            const message = res.data;
            if (message === "SUCCESS_CHANGE_PASSWORD") {    // 2. 비밀번호 변경 성공
              this.changePW = false;
              this.$store.dispatch("setAlertMessage", "success.change-password");
            } else {    // 3. 현재 비밀번호 불일치
              this.$store.dispatch("setAlertMessage", "error.not-match-prevpassword");
            }
          })
      }
    },

    // 회원 탈퇴 함수
    signout: function () {
      axios.delete(`https://contact.dabook.site/api/user/${this.email}`)
        .then(res => {
          console.log(res)
          if (res.data === true) {    // 회원탈퇴 성공
            localStorage.clear();
            this.$router.push({ name: 'Login'});
          } else {    // 회원탈퇴 실패
            this.$store.dispatch("setAlertMessage", "error.fail-signout");
          }
        })
    }
  }
}
</script>
<style scoped>
.flower {
  background-image: url('/assets/accountImg/flower.png');
  background-size: 100% 100%;
}
</style>