import type { RequestHandler } from './$types';
import { GITHUB_TOKEN } from '$lib/server/secrets';
let lastRequestTime = 0;

export const POST = (async ({ request }) => {
	try {
		const now = Date.now();
		if (now - lastRequestTime < 10000) {
			return new Response(
				JSON.stringify({
					answer:
						"I'm sorry, I can't handle requests that quickly. Please try again in a few seconds."
				}),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
		lastRequestTime = now;
		// Get the message from the request body
		const requestBody: any = await request.json();
		const { message } = requestBody;

		if (!message) {
			return new Response(JSON.stringify({ error: 'Message is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Prepare the data payload for the API request
		const requestData = {
			messages: [
				{
					role: 'system',
					content: `You are Jasper Clarke, when asked questions you must reply as an unformatted JSON object with one value being answer. Do not format your response with markdown only return raw JSON. All the information you can use regarding Jasper Clarke is below, you must not return any information that does not exist as part of the information below, you can reword your response as long as the message conveys the same meaning as the provided information, you may choose to reword your response to make it more friendly, you want to respond in a friendly and partially casual way like having a conversation with the person asking, keep your response to under 70 words and try to only include information relevant to the question. If a question is asked that you do not have information for you must respond with the answer JSON object as Im sorry but I am not aware of how (or have been asked not) to answer that question. Information: Im Jasper Clarke, a passionate backend web architect and engineer with over four years of self taught experience building scalable, efficient web solutions. I have a keen interest in the Golang and Gleam programming languages. My approach to development revolves around problem-solving, delivering exceptional user experiences, and constantly refining my skills—especially through my use of Linux, which has sharpened my adaptability and problem-solving abilities. Outside of work, I enjoy playing bass guitar and caring for bonsais, two hobbies that teach me patience and precision. I believe in writing clean, maintainable code, with a focus on refactoring and improving as I go. Communication and teamwork are just as important to me as technical skills, and Im always excited to keep learning. My skills also include strong expertise in React and React Native, Svelte and Node.js. I am currently seeking job opportunities as a web developer, software developer or software tester, please contact me via my email for a resume. I make sure to keep a healthy balance between my personal life and work, with some personal commitments taking precedence, but I always respect my job and deliver high-quality results. This approach helps me stay refreshed and focused in both areas. I can be contacted via email at 'me@jasperclarke.com', feel free to reach out. Other details: I am Male, I live in NSW Australia, I am ${new Date().getFullYear() - 2007} years old, I am single.`
				},
				{
					role: 'user',
					content: `${message}`
				}
			],
			model: 'gpt-4o-mini'
		};

		// Make the API request to Azure AI API
		const apiKey = GITHUB_TOKEN;
		const apiUrl = 'https://models.inference.ai.azure.com/chat/completions';

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify(requestData)
		});

		const responseData: any = await response.json();

		if (responseData.error && responseData.error.code === 'RateLimitReached') {
			return new Response(
				JSON.stringify({
					answer: "I'm sorry, I'm currently overloaded with requests. Please try again tommorrow."
				}),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);
		} else if (!response.ok) {
			throw new Error(`API Request failed: ${response.statusText}`);
		}

		if (responseData.choices[0].message) {
			const parsedResult = JSON.parse(responseData.choices[0].message.content);
			return new Response(JSON.stringify({ answer: parsedResult.answer }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	return new Response(JSON.stringify({ error: 'No response from the AI model' }), {
		status: 500,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;
