const TOOL_LABELS: Record<string, string> = {
  'power bi': 'Power BI',
  sql: 'SQL',
  dbt: 'dbt',
  duckdb: 'DuckDB',
};

export function formatToolLabel(tool: string): string {
  const normalized = tool.toLowerCase().trim();
  const knownLabel = TOOL_LABELS[normalized];

  if (knownLabel) {
    return knownLabel;
  }

  return tool
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
