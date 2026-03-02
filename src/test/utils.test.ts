import { describe, it, expect } from 'vitest';
import { formatDate, isRecent } from '../utils/date';
import { filterProjectsByTag, sortProjectsByTitle, type Project } from '../utils/projects';

describe('Date Utilities', () => {
  it('should format dates correctly', () => {
    const date = new Date('2024-03-02');
    expect(formatDate(date)).toBe('March 2, 2024');
  });

  it('should identify recent dates', () => {
    const now = new Date();
    const recent = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5); // 5 days ago
    const old = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60); // 60 days ago
    
    expect(isRecent(recent)).toBe(true);
    expect(isRecent(old)).toBe(false);
  });
});

describe('Project Utilities', () => {
  const projects: Project[] = [
    { title: 'Z Project', description: 'Desc Z', url: '/z', tags: ['react'] },
    { title: 'A Project', description: 'Desc A', url: '/a', tags: ['go', 'react'] },
    { title: 'B Project', description: 'Desc B', url: '/b', tags: ['go'] },
  ];

  it('should filter projects by tag', () => {
    const goProjects = filterProjectsByTag(projects, 'go');
    expect(goProjects).toHaveLength(2);
    expect(goProjects[0].title).toBe('A Project');
  });

  it('should sort projects by title', () => {
    const sorted = sortProjectsByTitle(projects);
    expect(sorted[0].title).toBe('A Project');
    expect(sorted[1].title).toBe('B Project');
    expect(sorted[2].title).toBe('Z Project');
  });
});
