export namespace Cow {
  export function say(text: string, cow: Cows | undefined): string;
}
/**
 * # Variants
 * 
 * ## `"default"`
 * 
 * ## `"owl"`
 */
export type Cows = 'default' | 'owl';
