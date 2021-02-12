<template>
  <div id="editor">
    <Alert/>
    <!-- <IconButtton/> -->
    <header id="header">
      <TopMenu/>
    </header>
    <div id="wrap">
      <div id="togglebar">
        <ToggleBar
          @toggleDir='toggleDir'
        />
      </div>
      <aside v-if="dirToggle" id="aside">
        <v-card max-height="100%" min-height="100%" class="overflow-y-auto" style="border-radius: 0%;">
          <v-btn v-if="dirTableToggle===true" @click="toggle" block text>{{ $t("directory") }}</v-btn>
          <v-btn v-else @click="toggle" block text>{{ $t("toc") }}</v-btn>
          <Directory
            v-show="dirTableToggle===true"
          />
          <TableOfContents
            v-show="dirTableToggle===false"
          />
        </v-card>
      </aside>
      <content :class="{'content-first': dirToggle, 'content-second': !dirToggle }">
      <!-- <content>  -->
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
// import IconButtton from "@/components/mainpage/IconButton";
import ToggleBar from "@/components/mainpage/ToggleBar";

export default {
  name: 'Editor',
  components: {
    TopMenu,
    Directory,
    TableOfContents,
    Textarea,
    Alert,
    // IconButtton,
    ToggleBar
  },
  data: function () {
    return {
      dirTableToggle: true,
      dirOpen: true,
      dirToggle: true,
    }
  },
  methods: {
    toggle: function () {
      this.dirTableToggle = !this.dirTableToggle;
    },
    toggleDir: function () {
      this.dirToggle = !this.dirToggle;
    },
  },
}
</script>