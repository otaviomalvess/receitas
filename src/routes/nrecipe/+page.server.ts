import { type Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	
	const tags = [
		"Arroz", "Atum", "Feijão", "Frango",
		"Fruta", "Granola", "Macarrão", "Ovo", "Peixe"
	];
	
	return { tags };
};