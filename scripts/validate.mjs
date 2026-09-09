import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateClaudePlugin } from '../plugins/ecomhunt/scripts/validate.mjs';

const marketplaceRoot = fileURLToPath(new URL('../', import.meta.url));

// Run from the marketplace checkout: node scripts/validate.mjs
// This checks local packaging only; it does not connect to Ecomhunt or Claude.
export async function validateClaudeMarketplace(root = marketplaceRoot) {
	const marketplace = JSON.parse(
		await readFile(path.join(root, '.claude-plugin/marketplace.json'), 'utf8'),
	);
	assert.equal(marketplace.name, 'ecomhunt', 'Marketplace name must remain ecomhunt.');
	assert.equal(
		marketplace.owner?.name,
		'Ecomhunt',
		'Marketplace must identify Ecomhunt as its owner.',
	);
	assert(Array.isArray(marketplace.plugins), 'Marketplace must contain a plugins array.');
	assert.equal(
		marketplace.plugins.length,
		1,
		'Marketplace must contain exactly one Ecomhunt plugin.',
	);
	const entry = marketplace.plugins[0];
	assert.equal(
		entry.source,
		'./plugins/ecomhunt',
		'Marketplace must resolve the plugin from ./plugins/ecomhunt.',
	);
	const pluginRoot = path.resolve(root, entry.source);
	const { manifest } = await validateClaudePlugin(pluginRoot);
	assert.equal(entry.name, manifest.name, 'Marketplace entry must match the plugin name.');
	if (entry.version !== undefined) {
		assert.equal(
			entry.version,
			manifest.version,
			'Marketplace and plugin versions must match.',
		);
	}
	return { manifest, pluginRoot };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	await validateClaudeMarketplace();
	console.log('PASS standalone Claude marketplace and nested Ecomhunt plugin');
}
