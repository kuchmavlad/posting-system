import { test, expect, Page } from '@playwright/test';

const COMMENT_MOCK = [
  {
    text: 'test',
    tags: ['bug'],
  },
  {
    text: 'test2',
    tags: ['issue'],
  },
];

const addComment = async (page: Page, comment: string, tags: string[] = []) => {
  const teatArea = page.getByPlaceholder('Add your comment here...');
  const addTagsBtn = page.getByRole('button', { name: '+ Add tags' });
  const tagList = page.getByRole('list');
  const addCommentBtn = page.locator('#add-comment-btn');

  await page.goto('http://localhost:4200/');
  await teatArea.fill(comment);
  await addTagsBtn.click();

  for (const tag of tags) {
    await tagList.getByText(tag).click();
  }
  await addCommentBtn.click();
};

test('should create comment', async ({ page }) => {
  const commentBody = page.locator('app-comment .comment-body');
  const commentHeader = page.locator('app-comment .comment-header');

  await addComment(page, COMMENT_MOCK[0].text, COMMENT_MOCK[0].tags);

  await expect(commentBody).toContainText(COMMENT_MOCK[0].text);
  await expect(commentHeader).toContainText(COMMENT_MOCK[0].tags);
});

test('should edit comment', async ({ page }) => {
  const commentBody = page.locator('app-comment .comment-body');
  const editBtn = page.getByRole('button', { name: 'edit comment' });
  const updateCommentBtn = page.getByRole('button', { name: 'Update comment' });
  const commentTextArea = page.locator('app-comment textarea');

  await addComment(page, COMMENT_MOCK[0].text);

  await editBtn.click();
  await commentTextArea.fill(COMMENT_MOCK[1].text);
  await updateCommentBtn.click();
  await expect(commentBody).toContainText(COMMENT_MOCK[1].text);
});

test('should delete comment', async ({ page }) => {
  const removeCommentBtn = page.getByRole('button', { name: 'remove comment' });
  const comment = page.locator('app-comment');

  await addComment(page, COMMENT_MOCK[1].text);

  await removeCommentBtn.click();
  const commentCount = await comment.count();
  await expect(commentCount).toBe(0);
});

test('should filter comment', async ({ page }) => {
  const comment = page.locator('app-comment');
  const filterByBtn = page.getByRole('button', { name: 'Filter by' });
  const bugTag = page.getByRole('list').getByText('bug');

  await addComment(page, COMMENT_MOCK[0].text, COMMENT_MOCK[0].tags);
  await addComment(page, COMMENT_MOCK[1].text, COMMENT_MOCK[1].tags);

  const commentCount = await comment.count();
  await expect(commentCount).toBe(2);
  await filterByBtn.click();
  await bugTag.click();
  const filteredCommentCount = await comment.count();
  await expect(filteredCommentCount).toBe(1);
});
