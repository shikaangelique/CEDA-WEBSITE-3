# How to add a new publication to the CEDA website

This guide explains how to publish a new document on [cedaghana.org](https://www.cedaghana.org) using the Supabase dashboard. You don't need to change any code, and the website updates as soon as you save.

It covers research reports, CEDA policies and annual reports. All three use the same steps. The **type** you choose in step 4 decides where the document appears.

| Type | Where it appears on the website |
|---|---|
| **Report** | Resource Centre → **Publications**, with its own page (abstract, key insights, download button) |
| **CEDA Policy** | Resource Centre → **Annual Reports**, as a cover tile that opens the PDF |
| **Annual Report** | Resource Centre → **Annual Reports**, as a cover tile that opens the PDF |

---

## Before you start

You need:

1. **A login to the CEDA Supabase project.** Ask the site administrator to invite your email address.
2. **The PDF.** Use a short file name with no spaces, for example `CEDA-Annual-Report-2026.pdf`. Each file must be under 50 MB.
3. **A cover image** (JPG, PNG or WebP). See the sizes below.
4. **The details:** title, year, month, theme, a short abstract, the authors and the main key insights.

### Cover image sizes

Large images slow the website down for everyone, so prepare the image first:

| Type | Shape | Size | Keep the file under |
|---|---|---|---|
| **Report** | Landscape (wide), e.g. a photo | 1600 × 900 px | 300 KB |
| **CEDA Policy / Annual Report** | Portrait (tall), e.g. the PDF's front page | 900 × 1200 px | 150 KB |

On a **Report** page the image fills the full width of the screen and is cropped to fit, so a small or portrait image will look blurry or badly cropped there. On the **Annual Reports** tab the tile is portrait, so a screenshot of the PDF's front page works well.

To shrink an image, use a free tool such as [squoosh.app](https://squoosh.app): open the image, set the width, choose **WebP** or **MozJPEG**, and download it.

Name the image after the publication, with no spaces: for example `ceda-annual-report-2026.webp`.

---

## Step 1: Open the CEDA project in Supabase

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and sign in.
2. Open the CEDA website project.

## Step 2: Upload the PDF

1. In the left sidebar, click **Storage**.
2. Open the bucket called **`publications`**.
3. Open the folder for the current year, for example **`2026`**. If there's no folder for this year yet, click **Create folder** and name it with the year (just the four digits).
4. Click **Upload file** and choose your PDF.
5. When the upload finishes, click the file, then **Get URL** (or **Copy URL**). Paste the link somewhere safe; you'll need it in step 4. It looks like this:

   ```
   https://ndlefvbivreuwyejvmtl.supabase.co/storage/v1/object/public/publications/2026/CEDA-Annual-Report-2026.pdf
   ```

## Step 3: Upload the cover image

1. Still in **Storage**, go back and open the bucket called **`thumbnails`**.
2. Open the folder **`publications`**.
3. Click **Upload file** and choose your cover image.
4. Click the uploaded image, then **Get URL**, and keep this link as well. It looks like this:

   ```
   https://ndlefvbivreuwyejvmtl.supabase.co/storage/v1/object/public/thumbnails/publications/ceda-annual-report-2026.webp
   ```

> **Tip:** paste each link into a new browser tab. If the PDF or image opens, the link is correct.

## Step 4: Add the publication's details

1. In the left sidebar, click **Table Editor**, then the **`publications`** table.
2. Click **Insert** → **Insert row**. A form opens on the right.
3. Fill in the fields below, then click **Save**.

### Fields to fill in

| Field | What to enter | Example |
|---|---|---|
| **slug** *(required)* | The web address for the publication. Use lowercase letters, numbers and hyphens only, with no spaces. It must be different from every other publication. | `ceda-annual-report-2026` |
| **title** *(required)* | The full title, as it should appear on the website. | `CEDA Annual Report 2026` |
| **type** *(required)* | Choose from the dropdown: **Report**, **CEDA Policy** or **Annual Report**. | `Annual Report` |
| **year** | The year it was published, as four digits. | `2026` |
| **month** | The month it was published, written in full. | `March` |
| **published_at** | The full publication date. This sets the order on the website, with the newest first. | `2026-03-15` |
| **theme** | Use one of the existing themes exactly as written: **Governance**, **Energy Transition**, **Mining**, or **Mining & Oil & Gas**. A new spelling creates a new filter option. | `Governance` |
| **file_url** | The PDF link you copied in step 2. | *(the PDF link)* |
| **thumbnail_url** | The cover image link you copied in step 3. | *(the image link)* |
| **file_name** | The PDF's file name. | `CEDA-Annual-Report-2026.pdf` |

### Extra fields for Reports

These appear on a **Report**'s own page. You can leave them empty for CEDA Policies and Annual Reports, because those only show as a tile.

| Field | What to enter |
|---|---|
| **abstract** | A short summary of 2–4 sentences. It's also used as the description when the page is shared on social media or shown in Google. |
| **key_insights** | The main findings, as a list. Each item is a separate line on the page. |
| **authors** | The author names, as a list. |
| **tags** | Search keywords, as a list. Tags aren't shown on the website; they only help people find the publication with the search box. See **How to choose tags** below. |
| **featured** | Set to **true** to show it in "Featured work" on the homepage. The homepage shows the 4 most recent featured publications, so switch an older one to **false** if needed. |

**key_insights**, **authors** and **tags** are lists. Enter each one with square brackets, put each item in double quotes, and separate the items with commas:

```
["First item", "Second item", "Third item"]
```

If an item contains a double quote, use single quotes inside it instead, for example `"The so-called 'resource curse'"`.

### How to choose tags

The search box already looks in the **title** and **abstract**. Tags are for words people might search for that **aren't** in either of those.

- **Use lowercase**, for example `royalties`, not `Royalties`.
- **One idea per tag**: a single word or a short phrase such as `local content`.
- **A search must match a whole tag.** A search for `royalties` finds the tag `royalties`, but a search for `royalty` doesn't. Add both forms if people are likely to use both.
- **Add abbreviations and full names** if only one appears in the title or abstract, for example `gra` and `ghana revenue authority`.
- **Aim for 4–8 tags.** Don't repeat the theme, because the theme filter already covers it.

Leave **id**, **created_at** and **updated_at** empty; Supabase fills them in automatically. You can also leave **related_reports** empty.

### Example: a report on mining royalties

This is how a completed **Report** row could look. The details are only an illustration, so don't copy the figures: the `[X]` values stand for numbers from the real report.

| Field | Value |
|---|---|
| **slug** | `mining-royalties-ghana-2026` |
| **title** | `Mining Royalties in Ghana: Who Benefits?` |
| **type** | `Report` |
| **year** | `2026` |
| **month** | `March` |
| **published_at** | `2026-03-15` |
| **theme** | `Mining` |
| **file_url** | `https://ndlefvbivreuwyejvmtl.supabase.co/storage/v1/object/public/publications/2026/CEDA-Mining-Royalties-Ghana-2026.pdf` |
| **thumbnail_url** | `https://ndlefvbivreuwyejvmtl.supabase.co/storage/v1/object/public/thumbnails/publications/mining-royalties-ghana-2026.webp` |
| **file_name** | `CEDA-Mining-Royalties-Ghana-2026.pdf` |
| **featured** | `true` |

**abstract**

```
This report examines how mining royalties in Ghana are collected, shared and spent. It traces royalty payments from large-scale gold mines through the Minerals Development Fund to district assemblies and traditional authorities, and assesses whether host communities see the benefits. It ends with recommendations to make royalty sharing more transparent and accountable.
```

**key_insights**

```
["Mining companies pay a royalty of [X]% of the gross value of minerals produced.", "Only [X]% of royalty revenue is returned to mining communities through the Minerals Development Fund.", "District assemblies publish little information on how they spend their share of royalties.", "Payments to traditional authorities are rarely reported to the communities they represent.", "Publishing royalty payments by mine and by district would let communities track what they receive."]
```

**authors**

```
["Samuel Bekoe", "Oppong Kyekyeku Appiah Senior"]
```

**tags**

```
["royalty", "mdf", "revenue sharing", "benefit sharing", "stool lands", "oasl", "extractives", "local government"]
```

The title and abstract already cover searches such as `royalties`, `gold` and `district assemblies`. These tags add words that aren't there: a search for `royalty` (singular), `mdf` or `stool lands` now finds the report too.

## Step 5: Check it on the website

1. Open the right page on the website:
   - **Report:** [cedaghana.org/resource-centre/publications](https://www.cedaghana.org/resource-centre/publications)
   - **CEDA Policy or Annual Report:** [cedaghana.org/resource-centre/annual-reports](https://www.cedaghana.org/resource-centre/annual-reports)
2. Refresh the page. The new publication should appear at or near the top.
3. Click it and check that the cover image shows and the PDF opens.

---

## Changing or removing a publication

- **To edit the details:** open the **`publications`** table, click the row, change the field and click **Save**.
- **To replace the PDF or cover:** upload the new file in **Storage** (step 2 or 3), copy its link, and paste it into **file_url** or **thumbnail_url**.
- **To remove a publication from the website:** delete its row in the **`publications`** table. This can't be undone, so copy the details somewhere first if you might need them. You can then delete its PDF and cover in **Storage**, but check that no other publication uses them.

## If something goes wrong

| Problem | What to check |
|---|---|
| *"duplicate key value violates unique constraint"* when saving | Another publication already uses that **slug**. Choose a different one. |
| *"invalid input value for enum publication_type"* | Choose the **type** from the dropdown; don't type it in. |
| The publication doesn't appear | Refresh the page. Check you're looking at the right tab for its **type**. |
| It's in the wrong place | Change its **type**: **Report** goes to Publications, and **CEDA Policy** or **Annual Report** goes to Annual Reports. |
| The cover image or PDF doesn't load | Paste the link from **thumbnail_url** or **file_url** into a browser tab. If it doesn't open, copy the link again from **Storage** (steps 2–3). |
| The cover image looks blurry or badly cropped | For Reports, use a landscape image at least 1600 px wide (see **Cover image sizes**). |
| The page loads slowly after adding a publication | The cover image is probably too large. Shrink it, upload it again, and update **thumbnail_url**. |
| Saving a list (key_insights, authors, tags) fails | Check the square brackets and that each item has double quotes, with commas between items. |

> **Note for the site administrator:** new publications appear on the website straight away, but they're only added to the sitemap (`sitemap.xml`, used by Google) on the next deploy. Search engines will still find them through the website's own links in the meantime.
