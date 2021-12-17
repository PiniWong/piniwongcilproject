<template>
  <div>
    <a-select :default-value="lang[hangerLanguage-1]" style="width: 120px" >
      <a-select-option v-for="item in lang" :key="item">
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
const lang = ['中文', '英文'];
export default {
  data() {
    return {
      lang,
      hangerLanguage:1
    };
  },
  methods: {
  },
};
</script>
