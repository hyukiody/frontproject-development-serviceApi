# Frontend Project Testing Guide

Complete guide for testing the React + Vite + TypeScript frontend application.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Unit & Component Tests](#unit--component-tests)
3. [Integration Tests](#integration-tests)
4. [E2E Tests](#e2e-tests)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Visual Regression Testing](#visual-regression-testing)

---

## Quick Start

### Prerequisites

```bash
# Node.js v18+ required
node --version

# npm required
npm --version
```

### Install Dependencies

```bash
cd jsproject
npm install
```

### Run Development Server

```bash
npm run dev
```

Server will be available at `http://localhost:5173`

### Run All Tests

```bash
npm test
```

---

## Unit & Component Tests

### Run Unit Tests

```bash
# Run all tests
npm test

# Run in watch mode (re-run on file changes)
npm test -- --watch

# Run single test file
npm test -- App.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Button"

# Generate coverage report
npm test -- --coverage
```

### Test Coverage

```bash
# Generate and view coverage
npm test -- --coverage
npm run coverage

# Expected targets:
# - Statements: >80%
# - Branches: >80%
# - Functions: >80%
# - Lines: >80%
```

### Example Unit Tests

```typescript
// src/lib/math.test.ts
import { describe, it, expect } from 'vitest';
import { add, multiply } from './math';

describe('Math utilities', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
    expect(multiply(-2, 3)).toBe(-6);
  });

  it('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
    expect(multiply(0, 5)).toBe(0);
  });
});
```

### Component Testing

```typescript
// src/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Integration Tests

### Test API Integration

```typescript
// src/lib/gitClient.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchGitContent } from './gitClient';

describe('Git Client Integration', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn();
  });

  it('should fetch content from GitHub API', async () => {
    const mockData = { content: 'base64encodedcontent' };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await fetchGitContent('owner', 'repo', 'path');
    expect(result).toBeDefined();
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    await expect(
      fetchGitContent('owner', 'repo', 'nonexistent')
    ).rejects.toThrow();
  });
});
```

### Component Integration Tests

```typescript
// src/components/App.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Integration', () => {
  it('renders main layout', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('navigates between pages', async () => {
    render(<App />);
    
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('loads content asynchronously', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});
```

---

## E2E Tests

### Setup Playwright (Optional)

```bash
npm install --save-dev @playwright/test

# Initialize Playwright
npx playwright install
```

### E2E Test Examples

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should load and display content', async ({ page }) => {
    await expect(page).toHaveTitle(/Frontend Project/);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should navigate to different pages', async ({ page }) => {
    const navLink = page.locator('a[href="/about"]');
    await navLink.click();
    
    await expect(page).toHaveURL(/\/about/);
  });

  test('should handle form submission', async ({ page }) => {
    const form = page.locator('form');
    const input = form.locator('input[name="query"]');
    const submitButton = form.locator('button[type="submit"]');
    
    await input.fill('test search');
    await submitButton.click();
    
    await expect(page).toHaveURL(/\?q=test/);
  });

  test('should load images correctly', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      await expect(image).toHaveJSProperty('complete', true);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.locator('[aria-label="menu"]');
    await expect(menuButton).toBeVisible();
  });
});
```

### Run E2E Tests

```bash
# Run Playwright tests
npx playwright test

# Run in UI mode
npx playwright test --ui

# Run specific test file
npx playwright test e2e/homepage.spec.ts

# Debug single test
npx playwright test e2e/homepage.spec.ts --debug
```

---

## Performance Testing

### Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g @lhci/cli@latest

# Run Lighthouse
lhci autorun --config=lighthouserc.json
```

**lighthouserc.json**:
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:5173/",
        "http://localhost:5173/about"
      ],
      "numberOfRuns": 3
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev vite-plugin-visualizer

# In vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true
    })
  ]
};

# Run build and view analysis
npm run build
```

### Runtime Performance

```typescript
// Performance monitoring utility
export function measurePerformance(label: string) {
  return {
    start: () => performance.mark(`${label}-start`),
    end: () => {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const measure = performance.getEntriesByName(label)[0];
      console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
    }
  };
}

// Usage
const timer = measurePerformance('component-render');
timer.start();
// ... render logic
timer.end();
```

---

## Accessibility Testing

### Run Accessibility Tests

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run tests
npm test -- --testPathPattern=a11y
```

### Accessibility Test Examples

```typescript
// src/components/Button.a11y.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <button aria-label="Close dialog">×</button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', () => {
    const { getByRole } = render(<button>Click me</button>);
    const button = getByRole('button');
    
    expect(button).toHaveProperty('tabIndex');
  });

  it('should have proper ARIA labels', () => {
    const { getByRole } = render(
      <button aria-label="Save document">💾</button>
    );
    
    expect(getByRole('button')).toHaveAccessibleName('Save document');
  });
});
```

### Manual Accessibility Testing

```bash
# Test with screen reader (macOS)
# 1. Enable VoiceOver: Cmd + F5
# 2. Navigate with: VO + Arrow Keys

# Test with keyboard only:
# 1. Tab through all interactive elements
# 2. Verify focus indicators
# 3. Test Enter/Space key functionality
```

---

## Visual Regression Testing

### Setup Percy (Optional)

```bash
npm install --save-dev @percy/cli @percy/playwright
```

### Visual Tests

```typescript
// e2e/visual.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('visual regression - homepage', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Full page screenshot
  await percySnapshot(page, 'Homepage');
  
  // Component screenshot
  const header = page.locator('header');
  await percySnapshot(page, 'Header', { element: header });
});
```

---

## Test Scenarios

### Scenario 1: User Flow Testing

```bash
# Test complete user journey
npm test -- --testNamePattern="User.*flow|complete.*flow"
```

### Scenario 2: Error Handling

```typescript
describe('Error Handling', () => {
  it('handles network failures gracefully', async () => {
    // Mock network failure
    vi.mock('./api', () => ({
      fetchData: vi.fn().mockRejectedValue(new Error('Network error'))
    }));
    
    render(<App />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('displays error boundaries', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
```

### Scenario 3: State Management Testing

```typescript
describe('State Management', () => {
  it('updates state correctly', () => {
    const { result } = renderHook(() => useAppState());
    
    act(() => {
      result.current.setUser({ name: 'John' });
    });
    
    expect(result.current.user.name).toBe('John');
  });
});
```

---

## CI/CD Integration

### GitHub Actions Testing

Already configured in `.github/workflows/deploy.yml`:

```yaml
- name: Run Tests
  run: npm test -- --run --coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

---

## Best Practices

1. **Write tests first** (TDD when possible)
2. **Keep tests focused** (one concept per test)
3. **Use meaningful descriptions** (clear test names)
4. **Mock external dependencies** (API calls, etc.)
5. **Test user behavior** (not implementation)
6. **Maintain >80% coverage** (but focus on important paths)
7. **Run tests frequently** (before commit)
8. **Review coverage gaps** (regularly)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout or mock slow operations |
| Flaky tests | Check for async operations, use waitFor |
| Import errors | Check path aliases in tsconfig |
| Mock not working | Ensure mock is before import |
| Coverage gaps | Add tests for error paths |

---

## Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run preview               # Preview production build
npm run build                 # Build for production

# Testing
npm test                      # Run tests
npm test -- --watch          # Watch mode
npm test -- --coverage       # Coverage report
npm run test:e2e             # E2E tests
npm run test:a11y            # Accessibility tests

# Code Quality
npm run lint                  # Run ESLint
npm run format               # Format with Prettier
npm run type-check           # TypeScript check

# Build
npm run build                # Production build
npm run preview              # Preview build locally
```

---

*Last Updated: January 2026*
*Version: 1.0*
