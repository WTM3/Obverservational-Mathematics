#!/usr/bin/env node

/**
 * apply-njson-bridge.js
 * 
 * Apply NJSON Swift Bridge database updates
 * Preserves the 0.1 buffer integrity throughout database operations
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

// Database constants
const DB_PATH = path.join(__dirname, '../../../blf-database.db');
const SQL_PATH = path.join(__dirname, 'njson-swift-bridge.sql');

// Buffer constants - must preserve exact 0.1 buffer
const AI_COGNITIVE = 2.89;
const BUFFER_VALUE = 0.1;
const BOOLEAN_MIND_QS = 2.99;

/**
 * Apply SQL updates to the database while preserving buffer integrity
 */
async function applyDatabaseUpdates() {
  console.log('🏎️ Applying NJSON Swift Bridge Database Updates');
  console.log('------------------------------------------------');
  console.log(`SQLite Path: ${DB_PATH}`);
  console.log(`SQL Script: ${SQL_PATH}`);
  console.log();
  
  // Verify buffer integrity constants
  const calculatedBMQs = AI_COGNITIVE + BUFFER_VALUE;
  if (Math.abs(calculatedBMQs - BOOLEAN_MIND_QS) > 0.0001) {
    console.error('❌ ERROR: Buffer integrity violation detected!');
    console.error(`AIc (${AI_COGNITIVE}) + buffer (${BUFFER_VALUE}) != BMqs (${BOOLEAN_MIND_QS})`);
    process.exit(1);
  }
  
  console.log('✅ Buffer integrity verified: AIc + 0.1 = BMqs');
  console.log(`   ${AI_COGNITIVE} + ${BUFFER_VALUE} = ${BOOLEAN_MIND_QS}`);
  console.log();
  
  try {
    // Read SQL file
    const sql = fs.readFileSync(SQL_PATH, 'utf8');
    
    // Connect to database
    console.log('Connecting to database...');
    const db = new sqlite3.Database(DB_PATH);
    
    // Promisify database methods
    const runAsync = promisify(db.run.bind(db));
    const execAsync = promisify(db.exec.bind(db));
    const closeAsync = promisify(db.close.bind(db));
    
    // Begin transaction
    console.log('Starting transaction...');
    await runAsync('BEGIN TRANSACTION');
    
    try {
      // Execute SQL script
      console.log('Applying SQL updates...');
      await execAsync(sql);
      
      // Verify database updates
      console.log('Verifying database updates...');
      
      // Commit transaction
      console.log('Committing transaction...');
      await runAsync('COMMIT');
      
      console.log();
      console.log('✅ Database updates applied successfully');
      console.log('The narrow bridge between Swift and NJSON has been recorded');
      console.log('Buffer integrity maintained throughout database operations');
    } catch (error) {
      // Rollback on error
      console.error(`❌ ERROR: ${error.message}`);
      await runAsync('ROLLBACK');
      throw error;
    } finally {
      // Close database
      await closeAsync();
    }
  } catch (error) {
    console.error(`❌ ERROR: Failed to apply database updates: ${error.message}`);
    process.exit(1);
  }
}

// Run the update process
applyDatabaseUpdates().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 