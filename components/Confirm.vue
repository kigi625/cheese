<template>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="confirm__wrap">
        <!-- 1줄일때 main-text 만 사용 //  2줄일때 sub-text 같이 사용-->
        <p class="main-text">{{ message.header }}</p>
        <p class="sub-text" v-html="message.message"></p>

        <div class="confirm-btn">
          <Button
            v-if="message.rejectLabel"
            :label="message.rejectLabel"
            class="cancel-btn"
            @click="rejectCallback"
          ></Button>

          <Button
            v-if="message.acceptLabel"
            :label="message.acceptLabel"
            class="save-btn"
            @click="acceptCallback"
          ></Button>
          <Button
            v-if="!message.acceptLabel && !message.rejectLabel"
            label="확인"
            class="save-btn"
            style="background-color: #ccc"
            @click="acceptCallback"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.confirm__wrap {
  font-family: Pretendard, sans-serif;
  width: 100%;
  min-width: 300px;
  padding: $px24 $px28 $px16;
  .main-text,
  .sub-text {
    line-height: 160%;
    color: $gray-800;
    text-align: center;
  }
  .confirm-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: $px24;
    button {
      width: 100%;
      padding: $px12 $px12;
      border-radius: $px8;
      font-size: $px14;
      margin-right: $px12;
      font-weight: 600;
      &:last-child {
        margin-right: 0;
      }
    }
    .save-btn {
      color: $gray-800;
    }
    .cancel-btn {
      color: $gray-400;
    }
  }
}
</style>
