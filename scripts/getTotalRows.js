// getTotalRows.js

async function getTotalRows() {
  try {
    const contentTypes = Object.keys(strapi.contentTypes);
    let totalRows = 0;
    const results = [];

    console.log('Counting rows in all tables...\n');

    for (const contentType of contentTypes) {
      try {
        const count = await strapi.db.query(contentType).count();
        results.push({ contentType, count });
        totalRows += count;
        console.log(`${contentType}: ${count} rows`);
      } catch (error) {
        // Skip tables that can't be queried
        console.log(`${contentType}: [Error - skipped]`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`TOTAL ROWS: ${totalRows}`);
    console.log('='.repeat(50));

    // Optional: Show top 10 tables by row count
    console.log('\nTop 10 tables by row count:');
    results
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .forEach((item, index) => {
      console.log(`${index + 1}. ${item.contentType}: ${item.count} rows`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await getTotalRows();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});