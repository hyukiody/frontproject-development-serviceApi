# Contributing to Frontend Project Development & Service API

First off, thank you for considering contributing to this project! 🎉

The following is a set of guidelines for contributing to this repository. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Style Guides](#style-guides)
  - [Git Commit Messages](#git-commit-messages)
  - [TypeScript Style Guide](#typescript-style-guide)
  - [Documentation Style Guide](#documentation-style-guide)
- [Development Setup](#development-setup)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps to reproduce the problem** in as much detail as possible.
- **Provide specific examples** to demonstrate the steps.
- **Describe the behavior you observed** after following the steps and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead** and why.
- **Include screenshots or animated GIFs** which show you following the described steps and clearly demonstrate the problem.
- **Include your environment details**: Node.js version, npm version, OS, browser, etc.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
- **Provide specific examples to demonstrate the steps** or provide mockups/wireframes.
- **Describe the current behavior** and **explain which behavior you would like to see instead** and why.
- **Explain why this enhancement would be useful** to most users.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through `good-first-issue` and `help-wanted` issues:

- **Good First Issues** - issues which should only require a few lines of code and a test or two.
- **Help Wanted Issues** - issues which should be a bit more involved than beginner issues.

### Pull Requests

The process described here has several goals:

- Maintain the project's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

Please follow these steps:

1. **Fork the repository** and create your branch from `main`.
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following the style guides below.

3. **Add or update tests** if you've added code that should be tested.

4. **Ensure the test suite passes**.
   ```bash
   npm run test
   ```

5. **Ensure your code builds successfully**.
   ```bash
   npm run build
   ```

6. **Commit your changes** using a descriptive commit message.
   ```bash
   git commit -m "Add amazing feature"
   ```

7. **Push to your fork**.
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request** with a clear title and description.

#### Pull Request Guidelines

- Fill in the pull request template
- Include screenshots or GIFs for UI changes
- Update documentation if needed
- End all files with a newline
- Avoid platform-dependent code

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐛 `:bug:` when fixing a bug
  - ✨ `:sparkles:` when adding a new feature
  - 📝 `:memo:` when writing docs
  - 🚀 `:rocket:` when improving performance
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security

### TypeScript Style Guide

- Use TypeScript for all new code
- Prefer interfaces over type aliases when possible
- Use explicit types for function returns
- Avoid `any` type - use `unknown` if the type is truly unknown
- Use meaningful variable names
- Keep functions small and focused
- Add JSDoc comments for public APIs

Example:
```typescript
/**
 * Fetches deployment methods from the API
 * @returns Promise with deployment methods data
 */
async function fetchDeploymentMethods(): Promise<DeploymentMethod[]> {
  const response = await fetch('/api/deployment-methods');
  return response.json();
}
```

### Documentation Style Guide

- Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation
- Reference functions and classes in backticks: \`functionName()\`
- Use code blocks with language specification:
  ~~~markdown
  ```typescript
  const example = "code";
  ```
  ~~~

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/frontproject-development-serviceApi.git
   cd frontproject-development-serviceApi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch for your changes**
   ```bash
   git checkout -b feature/my-feature
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Make your changes and test them**

## Testing

We use Vitest for unit testing. Please ensure all tests pass before submitting a pull request.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage
```

### Writing Tests

- Write tests for all new features and bug fixes
- Follow the existing test structure
- Use descriptive test names
- Aim for high code coverage

Example test:
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFunction';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

---

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing! 🙏
