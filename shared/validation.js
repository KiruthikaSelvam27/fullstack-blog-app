export const POST_RULES = {
  title: { min: 3, max: 200 },
  content: { min: 10 },
};

export function validatePostInput({ title, content }) {
  const trimmedTitle = title?.trim() ?? '';
  const trimmedContent = content?.trim() ?? '';
  const errors = [];

  if (trimmedTitle.length < POST_RULES.title.min) {
    errors.push({
      field: 'title',
      message: `Title must be at least ${POST_RULES.title.min} characters`,
    });
  }

  if (trimmedTitle.length > POST_RULES.title.max) {
    errors.push({
      field: 'title',
      message: `Title must be at most ${POST_RULES.title.max} characters`,
    });
  }

  if (trimmedContent.length < POST_RULES.content.min) {
    errors.push({
      field: 'content',
      message: `Content must be at least ${POST_RULES.content.min} characters`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    title: trimmedTitle,
    content: trimmedContent,
  };
}
