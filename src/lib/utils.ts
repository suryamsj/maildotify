import { showToast } from './store.svelte';

export function generateDotCombinations(
	username: string,
	maxDots: number,
	includeOriginal: boolean,
	randomize: boolean
) {
  if (username.includes('@')) {
		if (!username.toLowerCase().endsWith('@gmail.com')) {
			return [];
		}
	}

	username = username.replace(/@gmail\.com$/, '');
	const length = username.length;
	const originalEmail = username + '@gmail.com';
	let dotEmails: string[] = [];

	function generateCombinations(currentUsername: string, dotsLeft: number, position: number) {
		if (dotsLeft === 0 || position >= length - 1) {
			return;
		}

		const newUsername = currentUsername.slice(0, position + 1) + '.' + currentUsername.slice(position + 1);
		const newEmail = newUsername + '@gmail.com';
		if (!dotEmails.includes(newEmail)) {
			dotEmails.push(newEmail);
		}

		generateCombinations(newUsername, dotsLeft - 1, position + 2);
		generateCombinations(currentUsername, dotsLeft, position + 1);
	}

	generateCombinations(username, maxDots, 0);

	if (randomize) {
		dotEmails = shuffleArray(dotEmails);
	}

	let emails: string[] = [];

	if (includeOriginal) {
		emails = [originalEmail, ...dotEmails];
	} else {
		emails = dotEmails;
	}

	return emails;
}

function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

export function copyToClipboard(email: string) {
	navigator.clipboard
		.writeText(email)
		.then(() => {
			showToast('Email copied successfully!', 'success');
		})
		.catch((err) => {
			console.error('Gagal menyalin teks: ', err);
			showToast('Failed to copy email', 'error');
		});
}

export function copyAllToClipboard(generatedEmails: string[]) {
	const allEmails = generatedEmails.join('\n');
	navigator.clipboard
		.writeText(allEmails)
		.then(() => {
			showToast('All emails copied successfully!', 'success');
		})
		.catch((err) => {
			console.error('Gagal menyalin teks: ', err);
			showToast('Failed to copy all emails', 'error');
		});
}
