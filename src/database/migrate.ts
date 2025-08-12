import { DatabaseConnection } from './connection.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export class MigrationRunner {
  constructor(private db: DatabaseConnection) {}

  async runMigration(migrationFile: string): Promise<void> {
    try {
      const migrationPath = join(process.cwd(), 'src/database/migrations', migrationFile);
      const migrationSQL = readFileSync(migrationPath, 'utf8');
      
      // Split migration by semicolon and execute each statement
      const statements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

      for (const statement of statements) {
        if (statement.trim().length > 0) {
          await this.db.query(statement);
        }
      }

      console.log(`✅ Migration ${migrationFile} completed successfully`);
    } catch (error) {
      console.error(`❌ Migration ${migrationFile} failed:`, error);
      throw error;
    }
  }

  async runAllMigrations(): Promise<void> {
    const migrations = [
      '001_create_tenants_table.sql',
      '002_create_tenant_users_table.sql'
    ];

    for (const migration of migrations) {
      await this.runMigration(migration);
    }
  }
}

// CLI runner for migrations
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  async function main() {
    const db = new DatabaseConnection();

    try {
      await db.connect();
      const runner = new MigrationRunner(db);
      await runner.runAllMigrations();
      console.log('🎉 All migrations completed successfully');
    } catch (error) {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    } finally {
      await db.close();
    }
  }

  main();
}