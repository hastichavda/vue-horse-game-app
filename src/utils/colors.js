const UNIQUE_COLORS = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
  '#EC4899', '#F97316', '#84CC16', '#06B6D4', '#6366F1',
  '#DC2626', '#D97706', '#059669', '#2563EB', '#7C3AED',
  '#DB2777', '#EA580C', '#65A30D', '#0891B2', '#4F46E5',
]

export function getHorseColor(index) {
  return UNIQUE_COLORS[index % UNIQUE_COLORS.length]
}

