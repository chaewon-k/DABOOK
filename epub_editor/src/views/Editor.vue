<template>
  <div id="editor">
    <Alert/>
    <IconButtton/>
    <header id="header">
      <TopMenu/>
    </header>
    <div id="wrap">
      <aside v-if="dirToggle" id="aside">
        <v-card max-height="100%" min-height="100%" class="overflow-y-auto" style="border-radius: 0%;">
          <v-btn v-if="dirTableToggle===true" @click="toggle" block text>디렉토리</v-btn>
          <v-btn v-else @click="toggle" block text>목차</v-btn>
          <Directory
            v-show="dirTableToggle===true"
          />
          <TableOfContents
            v-show="dirTableToggle===false"
          />
        </v-card>
      </aside>
      <content :class="{'content-first': dirToggle, 'content-second': !dirToggle }">
        <Textarea />
      </content>
    </div>
  </div>
</template>

<script>
import TopMenu from '@/components/mainpage/TopMenu';
import Directory from '@/components/mainpage/Directory';
import TableOfContents from '@/components/mainpage/TableOfContents';
import Textarea from '@/components/mainpage/Textarea';
import Alert from "@/components/mainpage/Alert"
import IconButtton from "@/components/mainpage/IconButton";
import { mapState } from "vuex";

export default {
  name: 'Editor',
  components: {
    TopMenu,
    Directory,
    TableOfContents,
    Textarea,
    Alert,
    IconButtton,
  },
  data: function () {
    return {
      dirTableToggle: true,
      dirOpen: true
    }
  },
  methods: {
    toggle: function () {
      this.dirTableToggle = !this.dirTableToggle;
    },
  },
  computed: {
    ...mapState(['dirToggle']),
  },
}
</script>