# Claude Code Configuration

This file provides guidelines and context for the Claude AI assistant when working on this project.

## Project Overview

This is the `vive_simple` project. Please analyze the codebase structure and determine the appropriate technologies and patterns to use based on existing files.

## Coding Standards

### General Principles
- Follow existing code conventions and patterns found in the project
- Write clean, readable, and maintainable code
- Include appropriate error handling
- Follow security best practices
- Never commit secrets or API keys to the repository

### Code Style
- Use consistent indentation and formatting
- Write meaningful variable and function names
- Add comments only when necessary to explain complex logic
- Keep functions focused and modular

### Git Workflow
- Write clear, descriptive commit messages
- Use conventional commit format when appropriate
- Always test changes before committing
- Create pull requests for significant changes

## Testing
- Write tests for new functionality
- Ensure existing tests continue to pass
- Check for the presence of test scripts in package.json or other build files

## Documentation
- Update relevant documentation when making changes
- Keep README files current
- Document APIs and public interfaces

## Deployment
- Check for build scripts and linting tools in the project
- Run linting and type checking before finalizing changes
- Ensure changes don't break existing functionality

## Specific Project Commands
<!-- Add project-specific commands here as they are discovered -->
- Build: `npm run build` (if applicable)
- Test: `npm test` (if applicable)
- Lint: `npm run lint` (if applicable)
- Type check: `npm run typecheck` (if applicable)

## Notes for Claude
- Always examine the existing codebase before making changes
- Look for package.json, requirements.txt, or other dependency files to understand the tech stack
- Check for existing patterns and conventions in similar files
- Ask for clarification if the request is ambiguous
- Prioritize code quality and maintainability over speed