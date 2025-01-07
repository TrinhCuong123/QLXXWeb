import { h, type Component } from 'vue';
import { renderToString } from '@vue/server-renderer';

export function useComponentRenderer() {
  async function compile(c: Component, props: object): Promise<string> {
    return await renderToString(h(c, props));
  }

  return {
    compile,
  };
}
