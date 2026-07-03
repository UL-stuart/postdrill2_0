const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Load the app and select a session
  await page.goto('http://localhost:5175');
  await page.waitForSelector('button', { timeout: 5000 });
  const btns = await page.$$('button');
  console.log('Buttons on session picker:', btns.length);
  await page.screenshot({ path: '/tmp/v1-session-picker.png' });

  // Click the first session
  await btns[0].click();
  await page.waitForSelector('h1', { timeout: 5000 });
  const h1 = await page.$eval('h1', el => el.textContent);
  console.log('Page title after session pick:', h1);
  await page.screenshot({ path: '/tmp/v2-overview.png' });

  // 2. Hover over Looking Ahead card and check CommentButton appears
  const lookingAheadSection = await page.$('section:last-of-type');
  if (!lookingAheadSection) {
    console.log('ERROR: Could not find last section (Looking Ahead)');
    await browser.close();
    return;
  }
  await lookingAheadSection.hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/v3-hover-looking-ahead.png' });

  const commentBtn = await page.$('button[aria-label="Add comment"]');
  console.log('CommentButton found on hover:', !!commentBtn);

  // 3. Click CommentButton — dialog should appear
  if (commentBtn) {
    await commentBtn.click();
    await page.waitForTimeout(200);
    const textarea = await page.$('textarea');
    console.log('Textarea (CommentDialog) appeared:', !!textarea);
    await page.screenshot({ path: '/tmp/v4-dialog-open.png' });

    // 4. Type a comment and save
    if (textarea) {
      await textarea.fill('This is a test comment on Looking Ahead');
      const saveBtn = await page.$('button[type="button"]:has-text("Save")');
      await page.screenshot({ path: '/tmp/v5-dialog-filled.png' });
      if (saveBtn) {
        await saveBtn.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: '/tmp/v6-after-save.png' });

        // 5. Check callout appeared
        const calloutLabel = await page.$('span:has-text("Comment")');
        console.log('CommentCallout label found:', !!calloutLabel);

        // 6. Test Edit
        const editBtn = await page.$('button[type="button"]:has-text("Edit")');
        if (editBtn) {
          await editBtn.click();
          await page.waitForTimeout(200);
          const dialogAfterEdit = await page.$('textarea');
          const prefilledText = dialogAfterEdit ? await dialogAfterEdit.inputValue() : '';
          console.log('Edit re-opened dialog with text:', prefilledText);
          await page.screenshot({ path: '/tmp/v7-edit-dialog.png' });
          // Cancel it
          const cancelBtn = await page.$('button[type="button"]:has-text("Cancel")');
          if (cancelBtn) await cancelBtn.click();
          await page.waitForTimeout(200);
        }

        // 7. Test Delete
        const deleteBtn = await page.$('button[type="button"]:has-text("Delete")');
        if (deleteBtn) {
          await deleteBtn.click();
          await page.waitForTimeout(300);
          const calloutAfterDelete = await page.$('span:has-text("Comment")');
          console.log('Callout gone after delete:', !calloutAfterDelete);
          await page.screenshot({ path: '/tmp/v8-after-delete.png' });
        }
      }
    }
  }

  // 8. Test a facet row comment
  const facetRows = await page.$$('ul li');
  console.log('Facet rows found:', facetRows.length);
  if (facetRows.length > 0) {
    await facetRows[0].hover();
    await page.waitForTimeout(300);
    const facetCommentBtn = await page.$('button[aria-label="Add comment"]');
    console.log('CommentButton found on facet hover:', !!facetCommentBtn);
    await page.screenshot({ path: '/tmp/v9-facet-hover.png' });
  }

  // 9. Test a marker category row comment
  const categoryRows = await page.$$('.categoryRow, [class*="categoryRow"]');
  if (categoryRows.length === 0) {
    // Try getting divs inside the markers section
    const markerDivs = await page.$$('section:nth-of-type(3) > div > div');
    console.log('Marker section divs:', markerDivs.length);
    if (markerDivs.length > 0) {
      await markerDivs[0].hover();
      await page.waitForTimeout(300);
      await page.screenshot({ path: '/tmp/v10-marker-hover.png' });
    }
  }

  await browser.close();
  console.log('Done. Screenshots written to /tmp/v*.png');
})();
