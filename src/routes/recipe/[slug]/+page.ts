import { error, type Load } from '@sveltejs/kit';
import { receipts } from '../../../data.js';

export const load: Load = async ({ params }) => {
	const receipt = receipts.find((receipt) => receipt.slug === params.slug);

	if (!receipt) {
		return error(420);
	}

	return receipt;
};
