<template>
  <button
    :class="['btn', `size-${size}`, `variant-${variant}`, { 'icon-only': onlyIcon }]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots.left" class="icon-only" aria-hidden="true">
      <slot name="left" />
    </span>

    <span v-if="$slots.default" class="btn-text" aria-hidden="true">
      <slot />
    </span>

    <span v-if="$slots.right" class="icon-only" aria-hidden="true">
      <slot name="right" />
    </span>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'small' | 'default'
type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  onlyIcon?: boolean
  disabled?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'small',
  type: 'button',
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

.variant-primary {
  background: linear-gradient(180deg, #2b7afb 0%, #2174fd 100%, #213bfd 100%);
  color: var(--neutral-100);
  border: 1px solid var(--secondary-300);
  filter: drop-shadow(
    0px 2px 1px 0px #ffffff38 inset,
    0px -2px 0.3px 0px #0e387d2e inset,
    0px 2px 5px 0px #1458c92b
  );
}

.variant-secondary {
  background: var(--neutral-200);
  color: var(--neutral-800);
  border: 1px solid var(--neutral-500);
  filter: drop-shadow(0px 1px 3px 0px #19213d1a);
}

.variant-tertiary {
  background: var(--secondary-200);
  color: var(--primary-100);
  box-shadow: none;
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
  background: var(--secondary-300);
}

.variant-secondary:hover {
  background: var(--neutral-400);
}

.variant-tertiary:hover {
  background: var(--neutral-400);
}
</style>
