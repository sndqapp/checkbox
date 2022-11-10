<template>
  <div
    class="checkbox"
    @click="$emit('click')"
    :class="{
      editing: isEditing,
      checked: status !== 'unchecked',
    }"
  >
    <svg
      v-show="status === 'checked'"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.293 1.08601L4.00004 7.37901L1.70704 5.08601C1.51844 4.90385 1.26584 4.80306 1.00364 4.80534C0.741443 4.80761 0.49063 4.91278 0.305222 5.09819C0.119814 5.2836 0.0146453 5.53441 0.0123669 5.79661C0.0100885 6.05881 0.110883 6.31141 0.293041 6.50001L3.29304 9.50001C3.48057 9.68748 3.73488 9.7928 4.00004 9.7928C4.26521 9.7928 4.51951 9.68748 4.70704 9.50001L11.707 2.50001C11.8892 2.31141 11.99 2.05881 11.9877 1.79661C11.9854 1.53441 11.8803 1.2836 11.6949 1.09819C11.5095 0.912784 11.2586 0.807615 10.9964 0.805337C10.7342 0.803058 10.4816 0.903853 10.293 1.08601Z"
        fill="white"
      />
    </svg>

    <svg
      v-show="status === 'intermediate'"
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H11C11.2652 0 11.5196 0.105357 11.7071 0.292893C11.8946 0.48043 12 0.734784 12 1C12 1.26522 11.8946 1.51957 11.7071 1.70711C11.5196 1.89464 11.2652 2 11 2Z"
        fill="white"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    status: { type: String, required: true },
    wwEditorState: { type: Object, required: true },
    /* wwEditor:start */
  },
  emits: ["click"],
  computed: {
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  outline: none;
  margin: 0;

  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }

  /* wwEditor:end */
  transition: 0.2s;

  background: #f3f4f5;
  border-radius: 4px;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.checked {
    background: #0c31c6;
  }
}
</style>
