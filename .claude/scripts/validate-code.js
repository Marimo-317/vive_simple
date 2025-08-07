#!/usr/bin/env node

/**
 * Code Validation Hook
 * Runs after code changes to ensure quality
 */

const { execSync } = require('child_process');
const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);
    
    console.log('🔍 Running code validation...');
    
    // Check for package.json to determine available scripts
    const packageJsonExists = fs.existsSync('package.json');
    let packageJson = {};
    
    if (packageJsonExists) {
      packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    }
    
    const scripts = packageJson.scripts || {};
    
    // Run linting if available
    if (scripts.lint) {
      try {
        console.log('🧹 Running linter...');
        execSync('npm run lint', { stdio: 'inherit' });
        console.log('✅ Linting passed');
      } catch (error) {
        console.error('❌ Linting failed');
        process.exit(1);
      }
    }
    
    // Run type checking if available
    if (scripts.typecheck || scripts['type-check']) {
      try {
        console.log('📝 Running type check...');
        const typecheckCmd = scripts.typecheck ? 'typecheck' : 'type-check';
        execSync(`npm run ${typecheckCmd}`, { stdio: 'inherit' });
        console.log('✅ Type checking passed');
      } catch (error) {
        console.error('❌ Type checking failed');
        process.exit(1);
      }
    }
    
    // Run tests if in validation mode
    if (process.env.AUTODEV_VALIDATE_WITH_TESTS === 'true' && scripts.test) {
      try {
        console.log('🧪 Running tests...');
        execSync('npm test', { stdio: 'inherit' });
        console.log('✅ Tests passed');
      } catch (error) {
        console.error('❌ Tests failed');
        process.exit(1);
      }
    }
    
    console.log('✅ Code validation completed successfully');
    
  } catch (error) {
    console.error('Code validation error:', error.message);
    process.exit(1);
  }
});