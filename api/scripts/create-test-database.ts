import postgres from 'postgres';

const connection = postgres(
  'postgres://postgres:postgres@localhost:5432/postgres'
);

async function main() {
  const databaseName = 'addlink_test';

  const result = await connection`
    SELECT 1 FROM pg_database WHERE datname = ${databaseName}
  `;

  if (result.length === 0) {
    await connection.unsafe(`CREATE DATABASE ${databaseName}`);

    console.log(`Database "${databaseName}" created.`);
  } else {
    console.log(`Database "${databaseName}" already exists.`);
  }

  await connection.end();
}

main().catch(async error => {
  console.error(error);
  await connection.end();
  process.exit(1);
});
