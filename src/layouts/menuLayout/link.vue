<template>
  <component
    :is="componentType"
    v-bind="linkProps(basePath)"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate';

const props = defineProps({
  basePath: {
    type: String,
    default: ''
  }
});

const componentType = computed(() => {
  if (isExternal(props.basePath)) {
    return 'a';
  } else {
    return 'router-link';
  }
});

const linkProps = (to: string) => {
  if (isExternal(props.basePath)) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    };
  }
  return {
    to: to
  };
};
</script>

<script lang="ts">
export default {
  name: 'ItemLink'
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
