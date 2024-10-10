import { gsap } from 'gsap';

// @ts-ignore
export function animate(node, { type, ...args }) {
	// @ts-ignore
	let method = gsap[type];
	return method(node, args);
}
