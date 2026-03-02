import { describe, it, expect } from 'vitest';
import { GET } from '../pages/api/hello';

describe('Hello API Endpoint', () => {
  it('should return 200 and the correct message', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Hello from the Astro API!');
    expect(data.timestamp).toBeDefined();
  });
});
