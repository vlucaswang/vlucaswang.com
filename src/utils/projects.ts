export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export function filterProjectsByTag(projects: Project[], tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function sortProjectsByTitle(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.title.localeCompare(b.title));
}
