---
title: 'Integrating Svelte 5 and GSAP 3'
description: 'GSAP is an incredible library for creating smooth animations for your web pages but it can be a bit fidgety to use with Svelte so lets fix that.'
date: '2025-03-9'
updated: '2025-03-9'
image: /gsap-svelte.jpg
categories:
  - svelte
  - guide
published: true
---

*Inspired by [this post](https://dev.to/manyeya/how-i-integrate-svelte-with-gsap-3-4ll0)*
GSAP is, in my opinion, the go-to library for creating page animations.

If however you have ever tried to use GSAP with Svelte you will know that it can be a cluttered mess of code and a bit fidgety to use.
I mean just take a look at the code I was using for my website.

```svelte
<script>
	let heroSection;
	let philosophySection;
	let projectsSection;
	let experienceSection;
	let contactSection;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// Hero section animations
		gsap.from(heroSection.querySelector('h1'), {
			y: 30,
			opacity: 0,
			duration: 1,
			delay: 0.5
		});

		gsap.from(heroSection.querySelector('.hero-text'), {
			y: 20,
			opacity: 0,
			duration: 1,
			delay: 0.8
		});

    // and so on...
  });
</script>
```

Obviously there is a better way to do this, after finding the post I linked above it already made things a lot easier!

```js
// animate.js
import { gsap } from 'gsap';

export function animate(node, { type, ...args }) {
  let method = gsap[type];
  return method(node, args);
}
```

```svelte
	<a
		use:animate={{
			type: 'from',
			duration: 1,
			scale: 0.9,
			opacity: 0.5,
			ease: 'expo.inOut',
		}}
	>Link</a>
```

There are still a problem with this though. Since it's in JavaScript, there is no type checking and you can't use the autocomplete in your IDE.

After making a few changes it now fully supports TypeScript and meets all the requirements of a Svelte action so the LSP doesn't complain.

```typescript
// animate.ts
import { gsap } from 'gsap';

type AnimationType = keyof typeof gsap;

interface AnimationOptions extends GSAPTweenVars {
    type: AnimationType;
}

export function animate(
    node: HTMLElement,
    { type, ...args }: AnimationOptions
): { destroy?: () => void } {
    const method = gsap[type] as
        | ((target: gsap.TweenTarget, vars: GSAPTweenVars) => GSAPTween)
        | undefined;

    if (!method) {
        console.warn(`GSAP method "${type}" does not exist.`);
        return {};
    }

    // Create the animation
    const tween = method(node, args);

    return {
        destroy() {
            // Kill the animation when the element is removed
            tween.kill();
        }
    };
}
```

But there is still one more issue, the scrollTrigger option doesn't work!
And adding `gsap.registerPlugin(ScrollTrigger);` to your `onMount` function doesn't work either. A little extra work is needed to get this working.

```typescript
// animate.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

type AnimationType = keyof typeof gsap;

interface AnimationOptions extends GSAPTweenVars {
	type: AnimationType;
	scrollTrigger?: ScrollTrigger.Vars;
}

export function animate(
	node: HTMLElement,
	{ type, scrollTrigger, ...args }: AnimationOptions
): { destroy?: () => void } {
	const method = gsap[type] as
		| ((target: gsap.TweenTarget, vars: GSAPTweenVars) => GSAPTween)
		| undefined;

	if (!method) {
		console.warn(`GSAP method "${type}" does not exist.`);
		return {};
	}

	// Create the animation with ScrollTrigger if provided
	const tween = method(node, {
		...args,
		scrollTrigger: scrollTrigger
			? {
					...scrollTrigger,
					trigger: scrollTrigger.trigger || node
				}
			: undefined
	});

	return {
		destroy() {
			// Kill the animation when the element is removed
			tween.kill();

			// If using ScrollTrigger, make sure to kill that instance too
			if (scrollTrigger && tween.scrollTrigger) {
				tween.scrollTrigger.kill();
			}
		}
	};
}
```

This updated code registers the ScrollTrigger plugin with GSAP and allows you to pass in a `scrollTrigger` option to the `animate` function. In doing this it will automatically set the element you have used this action on as the `scrollTrigger.trigger` element!

Now you can use it like this and have full type checking in your IDE:
```svelte
<div class="overflow-hidden">
  <h1
    class="font-serif text-7xl font-medium"
    use:animate={{
      type: 'from',
      duration: 1,
      yPercent: 100,
      ease: 'power4.out',
      scrollTrigger: {
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }}
  >
    Other content
  </h1>
</div>
```

I hope this helps and massive shoutout to [Khutso Siema](https://dev.to/manyeya) for the original post.
