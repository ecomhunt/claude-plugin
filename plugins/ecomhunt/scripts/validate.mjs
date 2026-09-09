import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pluginRoot = fileURLToPath(new URL('../', import.meta.url));

// Run from the plugin directory or extracted plugin ZIP: node scripts/validate.mjs
// This checks local packaging only; it does not connect to Ecomhunt.
export async function validateClaudePlugin(root = pluginRoot) {
	const readText = (relativePath) =>
		readFile(path.join(root, relativePath), 'utf8');
	const readJson = async (relativePath) =>
		JSON.parse(await readText(relativePath));

	const manifest = await readJson('.claude-plugin/plugin.json');
	assert.equal(manifest.name, 'ecomhunt', 'Plugin name must remain ecomhunt.');
	assert.match(
		manifest.version,
		/^\d+\.\d+\.\d+$/,
		'Plugin version must use semantic versioning.',
	);

	const mcpConfig = await readJson('.mcp.json');
	assert.equal(
		mcpConfig.mcpServers?.ecomhunt?.type,
		'http',
		'Ecomhunt must use the mcpServers wrapper and HTTP transport.',
	);
	assert.equal(
		mcpConfig.mcpServers?.ecomhunt?.url,
		'https://ecomhunt.com/api/mcp',
		'Ecomhunt must use the production HTTPS MCP endpoint.',
	);
	assert.deepEqual(
		Object.keys(mcpConfig.mcpServers),
		['ecomhunt'],
		'Plugin must configure only the Ecomhunt remote MCP server.',
	);

	const skill = await readText('skills/ecomhunt-product-launch/SKILL.md');
	assert(skill.startsWith('---\n'), 'Skill must start with YAML frontmatter.');
	const frontmatterEnd = skill.indexOf('\n---\n', 4);
	assert(frontmatterEnd > 4, 'Skill frontmatter must have a closing delimiter.');
	const frontmatter = skill.slice(4, frontmatterEnd);
	assert.match(
		frontmatter,
		/^name: ecomhunt-product-launch$/m,
		'Skill name must remain stable.',
	);
	assert(
		frontmatter.split('\n').includes(`version: ${manifest.version}`),
		'Skill and plugin versions must match.',
	);
	for (const relativePath of [
		'skills/ecomhunt-product-launch/references/workflow.md',
		'skills/ecomhunt-product-launch/references/examples.md',
		'README.md',
		'SETUP.md',
	]) {
		assert(
			(await readText(relativePath)).trim(),
			`Required plugin file ${relativePath} must not be empty.`,
		);
	}

	return { manifest };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	await validateClaudePlugin();
	console.log('PASS standalone Claude plugin, connector configuration, and required files');
}
