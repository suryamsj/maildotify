import { showToast } from './store.svelte';

// Fungsi untuk menghasilkan semua kombinasi titik yang mungkin
export function generateDotCombinations(
	username: string,
	maxDots: number,
	includeOriginal: boolean,
	randomize: boolean
) {
	// Memastikan username tidak mengandung @gmail.com
	username = username.replace(/@gmail\.com$/, '');

	// Panjang username
	const length = username.length;

	// Email asli
	const originalEmail = username + '@gmail.com';

	// Array untuk menyimpan email dengan titik
	let dotEmails: string[] = [];

	// Fungsi rekursif untuk menghasilkan kombinasi
	function generateCombinations(currentUsername: string, dotsLeft: number, position: number) {
		// Basis rekursi: jika tidak ada titik yang tersisa atau sudah mencapai akhir username
		if (dotsLeft === 0 || position >= length - 1) {
			return;
		}

		// Tambahkan titik di posisi saat ini
		const newUsername =
			currentUsername.slice(0, position + 1) + '.' + currentUsername.slice(position + 1);

		// Tambahkan email baru ke array
		const newEmail = newUsername + '@gmail.com';
		if (!dotEmails.includes(newEmail)) {
			dotEmails.push(newEmail);
		}

		// Lanjutkan rekursi untuk posisi berikutnya
		generateCombinations(newUsername, dotsLeft - 1, position + 2);

		// Coba posisi lain untuk titik yang sama
		generateCombinations(currentUsername, dotsLeft, position + 1);
	}

	// Mulai rekursi untuk menghasilkan email dengan titik
	generateCombinations(username, maxDots, 0);

	// Jika randomize diaktifkan, acak urutan email dengan titik
	if (randomize) {
		dotEmails = shuffleArray(dotEmails);
	}

	// Array akhir yang akan dikembalikan
	let emails: string[] = [];

	// Tambahkan email asli di posisi pertama jika diminta
	if (includeOriginal) {
		emails = [originalEmail, ...dotEmails];
	} else {
		emails = dotEmails;
	}

	return emails;
}

// Fungsi untuk mengacak array
function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

// Fungsi untuk menyalin email ke clipboard
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

// Fungsi untuk menyalin semua email ke clipboard
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
