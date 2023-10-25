import { error, type Load } from '@sveltejs/kit';
import { recipes } from '../../../data.js';

export const load: Load = async ({ params }) => {
	// query no banco
	const recipe = recipes.find((recipe) => recipe.slug === params.slug);

	if (!recipe) {
		return error(420);
	}

	return recipe;
};
