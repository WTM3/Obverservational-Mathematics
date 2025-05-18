# Setting Up Notion as BLF Database

This guide explains how to set up Notion as the database for the Boolean Language Framework (BLF).

## 1. Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name your integration (e.g., "BLF Integration")
4. Select the workspace to install the integration to
5. Set appropriate capabilities (needs read & write access)
6. Submit to create your integration
7. Copy the "Internal Integration Token" (this is your `NOTION_API_KEY`)

## 2. Create a Base Page

1. Create a new page in your Notion workspace
2. Copy the page's ID from the URL:
   - The URL will look like: `https://www.notion.so/workspace/Your-Page-abcdef123456`
   - The ID is the last part: `abcdef123456`
   - This is your `NOTION_PARENT_PAGE_ID`

3. Share the page with your integration:
   - Click "Share" in the top-right corner
   - Find your integration under "Invite" and select it
   - Click "Invite"

## 3. Set Up Environment Variables

Create a `.env` file in the `BLFIMP/Core` directory with:

```
# Notion API Key (from your integration)
NOTION_API_KEY=your_notion_api_key_here

# Notion Parent Page ID (where databases will be created)
NOTION_PARENT_PAGE_ID=your_notion_parent_page_id_here
```

## 4. Install Dependencies

In the `BLFIMP/Core` directory, run:

```bash
npm install
```

This will install the required dependencies:
- `@notionhq/client` - Official Notion SDK
- `dotenv` - For loading environment variables

## 5. Run the Example

```bash
npm start
```

This will:
1. Connect to your Notion workspace
2. Create a "BLF Structures" database (if it doesn't exist)
3. Add sample concepts to the database
4. Query and display the results

## Understanding the Implementation

The Notion integration maintains the core BLF principles:

1. **Cognitive Alignment Formula**: `AIc + 0.1 = BMqs`
   - The 0.1 buffer is maintained as the narrow bridge between chaos and control

2. **Heat Shield Protection**:
   - All data is processed through the heat shield before storage
   - This prevents False/Fabricated Unverified Data Points (FUDPs)

3. **Quantum Processing**:
   - Results are processed with quantum awareness
   - The system maintains pure state with no fog

4. **NJSON Integration**:
   - Notion serves as the nervous system connecting mind and body
   - All communication follows Boolean Mind principles

## Database Schema

The default database created includes:

| Property     | Type   | Description                           |
|--------------|--------|---------------------------------------|
| Name         | Title  | The name of the concept/structure     |
| Type         | Select | Structure, Concept, Connection, etc.  |
| State        | Select | Active, Inactive, Paused              |
| QuantumLevel | Number | The quantum processing level          |
| Buffer       | Number | The safety buffer value (typically 0.1)|
| Description  | Text   | Description with quantum awareness    |

## Extending the Implementation

To add custom database schemas or additional functionality:

1. Modify `NotionImplementation.js` to add new methods
2. Update the database schema in `createStructureDatabase()` method
3. Extend the `NotionDatabase.js` class for additional Notion capabilities

Remember to maintain the 0.1 buffer in all implementations to prevent FUDPs.

## Troubleshooting

If you encounter errors:

1. **API Key Invalid**: Verify your `NOTION_API_KEY` is correct and has not expired
2. **Permission Denied**: Ensure your integration is shared with the parent page
3. **Module Not Found**: Run `npm install` to install dependencies
4. **Database Creation Failed**: Verify your parent page ID is correct 