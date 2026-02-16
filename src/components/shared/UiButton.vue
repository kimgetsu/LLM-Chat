<template>
  <button
    :class="['btn', `size-${size}`, `variant-${variant}`, { 'icon-only': onlyIcon }]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots.left" aria-hidden="true" class="icon-btn">
      <slot name="left" />
    </span>

    <span v-if="$slots.default" class="btn-text" aria-hidden="true">
      <slot />
    </span>

    <span v-if="$slots.right" aria-hidden="true" class="icon-btn">
      <slot name="right" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ButtonVariant, ButtonSize, ButtonType } from './button.types'
import type { ButtonProps } from './button.types'

withDefaults(defineProps<ButtonProps>(), {
  variant: ButtonVariant.Primary,
  size: ButtonSize.Default,
  type: ButtonType.Button,
  onlyIcon: false,
  disabled: false,
})
</script>

<style scoped>
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid transparent;
  padding-inline: 17px;
}

.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.variant-primary {
  background: linear-gradient(180deg, #2b7afb 0%, #2174fd 100%, #213bfd 100%);
  color: var(--neutral-100);
  border: 1px solid #5f6ccc;
  filter: drop-shadow(
    0px 2px 1px 0px #ffffff38 inset 0px -2px 0.3px 0px #0e387d2e inset 0px 2px 5px 0px #1458c92b
  );
  transition: filter 0.3s ease;
}

.variant-secondary {
  background: var(--neutral-200);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-500);
  filter: drop-shadow(0px 1px 3px 0px #19213d1a);
  transition: background 0.3s ease;
}

.variant-tertiary {
  background: var(--secondary-200);
  color: var(--primary-100);
  box-shadow: none;
  transition: background 0.3s ease;
}

.size-small {
  height: 32px;
  padding: 8px;
  gap: 8px;
}

.size-default {
  height: 42px;
  padding-top: 12px;
  padding-bottom: 12px;
  gap: 12px;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  line-height: 115%;
}

.icon-only.size-small {
  width: 32px;
  padding: 0;
  gap: 0;
}

.icon-only.size-default {
  width: 42px;
  padding-inline: 0;
  gap: 0;
}

.variant-primary:hover {
  filter: brightness(0.87) saturate(1.1);
}

.variant-secondary:hover {
  background: var(--neutral-400);
}

.variant-tertiary:hover {
  background: var(--neutral-400);
}

.variant-primary:active {
  filter: brightness(1.15) saturate(1.1);
}

.variant-secondary:active {
  background: var(--neutral-500);
}

.variant-tertiary:active {
  background: var(--neutral-500);
}
</style>
