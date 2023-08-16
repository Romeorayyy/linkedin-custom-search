# Linkendin Custom Search - React Project Overview

This React project provides a custom interface for performing Google searches, displaying results, and offering related functionalities using the Google Search API.

## File and Directory Descriptions

### Root Level:

- `package-lock.json` & `package.json`: Manage project dependencies and metadata.
- `public/`: Holds assets served directly without processing. Key files include:
  - `index.html`: The primary HTML file where the root React component is mounted.
  - `manifest.json`: Web app manifest with metadata for PWAs.
  - `robots.txt`: Directives for web crawling bots.

### Source (`src/`) Directory:

This is the heart of the React application.

- `App.js`: The root component wrapping key application components inside the `SearchProvider` from the search context.
- `GoogleSearch.js`: The primary interface for search functionalities, leveraging several child components.
- `index.js`: Entry point for the React app.
- `components/`: Houses reusable React components.
  - `SearchComponent/`: Contains components and styles dedicated to search functionalities.
  - `Results.js`, `SearchForms.js`, `DataTable.js`, `ProfileCard.js`: Various components that constitute the `GoogleSearch` component, each serving specific roles in the search and display process.
- `context/`: Contains React context providers.
  - `SearchContext.js`: Centralized state and methods for search functionality are defined here. The `SearchProvider` offers these capabilities to any wrapped components, while the `useSearch` hook provides easy access to the context.

## Component Interactions and Relationships

- **App Component** : Serves as the application's main entry point, ensuring that key components have access to the search context via `SearchProvider`.
- **GoogleSearch Component** : Acts as the central interface for search functionalities. It uses the `SearchForms` component for user inputs and displays search results through the `Results` and `DataTable` components. Detailed views of selected items might be shown via the `ProfileCard` component.
- **SearchContext** : The heart of the search functionality. Components like `GoogleSearch`, `Results`, and `SearchForms` heavily interact with this context to fetch, display, and manage search results. It provides state variables like `searchQuery` and `googleSearchResults` and methods like `handleSearch` to perform and manage searches.
-

## Components Overview:

1. **SearchForms.js**

   - **Purpose** : Provides a user interface for inputting search queries.
   - **Key Features** : Offers two search types: specific job title search and a general search.

2. **ProfileCard.js**

   - **Purpose** : Showcases individual LinkedIn profile details in a card layout.
   - **Key Features** : Expandable sections to view more information.

3. **Results.js**

   - **Purpose** : Presents the search results from scraped LinkedIn profiles.
   - **Key Features** : Each result is displayed in a card format with essential attributes.

4. **GoogleSearch.js**

   - **Purpose** : Serves as the main component, integrating various sub-components for the custom LinkedIn search functionality.
   - **Key Features** : Responsive layout with a fluid container, rows, and columns.

5. **App.js**

   - **Purpose** : Acts as the root component, setting up the main structure and context providers for the application.
   - **Key Features** : Wraps the application within the `SearchProvider` for shared state and functions.

Each component employs the `mdb-react-ui-kit` library for a consistent and visually appealing user interface. State management is facilitated by React context, ensuring efficient data sharing across components.

### SearchForms.js:

1. **Imports** :

- **React** : Standard for any React component.
- **MDB Components** : UI components for form inputs, buttons, and layout.
- **useSearch Hook** : Directly imported from `SearchContext`, this hook provides access to the search-related state and methods.

1. **Component Structure** :

- The component consists of two forms:
  1. **Job Search Form** : Allows users to enter a "Job Title" and "Location or Keywords to Include". These inputs are likely for a more specialized or filtered search. This form has a submit button labeled "Generate Custom Search" and uses the `handleSpecificSearchSubmit` method.
  2. **General Search Form** : Allows users to enter a generic search query. This form has a submit button labeled "Search" and uses the `handleSearchSubmit` method.

1. **Interactions with SearchContext** :

- The `useSearch` hook provides several state values (`jobTitle`, `locationKeywords`, `searchQuery`) and their associated update methods (`handleSetJobTitle`, `handleSetLocationKeyword`, `handleSearchQuery`). These ensure that the inputs are synced with the context's state.
- The submit methods (`handleSpecificSearchSubmit` and `handleSearchSubmit`) likely trigger the search operations, updating the results in the `SearchContext`.

  **Component** : `SearchForms.js`

  **Purpose** :
  This component serves as the main interface for users to input search queries. It offers two types of search functionalities: specific job title search and a general search.

  **Styling & Layout** :
  The component uses the `mdb-react-ui-kit` library for its UI elements, ensuring a consistent and responsive design. The layout consists of two main forms, each containing input fields and buttons.

  **Interconnections** :

1. **State Management** : The component is tightly coupled with the `SearchContext` from which it utilizes the `useSearch` hook. This hook provides the necessary state and functions to manage the search inputs and handle form submissions.
2. **Children Components** : None identified in the initial snippet. Further exploration might reveal more.
3. **Parent Component** : Not identified from the current snippet.

**Functions & Methods** :

- `handleSpecificSearchSubmit`: Handles the submission of the specific search form.
- `handleSearchSubmit`: Handles the submission of the general search form.
- Several setter functions like `handleSetJobTitle` and `handleSearchQuery` to manage input states.

### Results.js:

1. **Imports** :

- **React** : Standard for any React component.
- **MDB Components** : UI components for creating cards, buttons, typography, and other visual elements.
- **useSearch Hook** : Directly imported from `SearchContext`, this hook provides access to the search-related state and methods.

1. **Component Structure** :

- The component uses the MDB card layout to display individual search results.
- Each search result displays a title (linked to the original source), a URL, and potentially additional metadata, such as descriptions from Twitter cards.
- A "Load More" button is present, allowing users to load additional search results.

1. **Interactions with SearchContext** :

- The `useSearch` hook provides the `metaData` state value and the `handleLoadMore` method. `metaData` likely contains the search results, while `handleLoadMore` might be used to fetch additional results.
- The component maps through `metaData` to render individual search results as cards.
- The "Load More" button utilizes the `handleLoadMore` method to fetch and display additional search results.

  **Purpose** :
  The `Results` component is tasked with presenting the search results derived from scraped LinkedIn profiles. Each result is showcased in a card format, detailing essential attributes like title, description, and a direct link to the original profile.

  **Styling & Layout** :
  Utilizing the `mdb-react-ui-kit` library, the component employs various UI components, including `MDBCard`, `MDBCardBody`, `MDBCardText`, `MDBCardTitle`, `MDBTypography`, and `MDBBtn`, to create a consistent and visually appealing presentation. Each result is rendered as an individual card, allowing for a clear distinction between different profiles.

  **Interconnections** :

1. **State Management** : It interacts with the `SearchContext` through the `useSearch` hook, leveraging states like `metaData` and functions such as `handleLoadMore`.
2. **Children Components** : None identified in the initial snippet. Further exploration might reveal more.
3. **Parent Component** : Not identified from the current snippet.

**Functions & Methods** :

- The component processes the `metaData` to extract and present key attributes of each LinkedIn profile.
- A conditional rendering ensures that only valid results (those with an `og:url`) are displayed.

### DataTable.js:

**Purpose** :
This component is responsible for presenting the scraped LinkedIn profile data in a structured tabular format. It offers features like row expansion/collapse and truncation of longer descriptions for a more concise view.

**Styling & Layout** :
The component leverages the `mdb-react-ui-kit` library, particularly the `MDBTable`, `MDBTableHead`, and `MDBTableBody` components, to render a consistent and styled table. Rows might be expandable to view additional details.

**Interconnections** :

1. **State Management** : It uses the `useSearch` hook from the `SearchContext` to access various states, including `metaData`, `emailsData`, and `selectedProfiles`.
2. **Children Components** : None identified in the initial snippet. Further exploration might reveal more.
3. **Parent Component** : Not identified from the current snippet.

**Functions & Methods** :

- `getEmailFromUrl`: Retrieves the email address associated with a given profile URL.
- `toggleExpand`: Toggles the expanded/collapsed state of table rows or details.
- `truncateDescription`: Truncates longer descriptions for concise display in the table.

1. **Imports** :

- **React & useState** : React's core and the `useState` hook for local component state.
- **MDB Components** : UI components for creating tables.
- **useSearch Hook** : Directly imported from `SearchContext`, this hook provides access to the search-related state and methods.

1. **Component State** :

- `expanded`: A state variable that tracks which rows in the table are expanded to show more details.

1. **Component Structure** :

- The component renders an `MDBTable` that contains table headers (`MDBTableHead`) and table rows (`MDBTableBody`).
- Each row displays details like First Name, Last Name, Email, LinkedIn Title, Description, and URL.
- The description can be expanded or truncated based on user interaction.

1. **Interactions with SearchContext** :

- The `useSearch` hook provides access to `metaData` (search results), `emailsData` (possibly additional data with email addresses), and `selectedProfiles` (profiles that have been selected for detailed view).
- The component filters `metaData` based on `selectedProfiles` and maps through the filtered results to render individual rows in the table.
- The `getEmailFromUrl` function is used to get an email address associated with a specific URL from `emailsData`.
- The `toggleExpand` function updates the `expanded` state to control the display of descriptions in the table.

1. **Utility Functions** :

- `truncateDescription`: If a description is too long, this function truncates it to show only the first few words with an ellipsis (`...`).
- The `DataTable.js` component serves as a detailed view of selected search results, presenting data in a tabular format. It heavily utilizes the `SearchContext` to access and display relevant data.

### ExportData.js:

**Component** : `ExportData.js`

**Purpose** :
This component is dedicated to the exportation of scraped LinkedIn profile data. Users can select their preferred export format (e.g., CSV, XLSX) and download the data.

**Styling & Layout** :
The component employs the `mdb-react-ui-kit` library, particularly the `MDBBtn`, to ensure a consistent UI. The layout likely consists of a button or dropdown to select the export type and initiate the export process.

**Interconnections** :

1. **State Management** : The component uses the `useSearch` hook from the `SearchContext` to access various states, including `metaData`, `emailsData`, and `selectedProfiles`.
2. **Children Components** : None identified in the initial snippet. Further exploration might reveal more.
3. **Parent Component** : Not identified from the current snippet.

**Functions & Methods** :

- `getEmailFromUrl`: Retrieves the email address associated with a given profile URL.
- `handleExport`: The main function that aggregates data from different states, prepares it for export, and initiates the download process.

  **External Libraries** :

- `XLSX`: A library to work with spreadsheet data.
- `export-from-json`: A utility to export JSON data to various formats.
- `file-saver`: Enables client-side saving of files.

### ProfileCard.js:

1. **Imports** :

- **React, useState, useEffect** : React's core, the `useState` hook for local component state, and the `useEffect` hook for lifecycle methods.
- **MDB Components** : UI components for creating cards, list groups, links, and other visual elements.
- **useSearch Hook** : Directly imported from `SearchContext`, this hook provides access to the search-related state and methods.

1. **Component State** :

- `expanded`: A state variable that tracks which cards in the list are expanded to show more details.
- `windowSize`: A state variable that tracks the current window size, used for responsive behavior.

1. **Component Structure** :

- The component maps through the `metaData` and renders a card for each entry.
- Each card displays an image, title, first name, last name, email (if available), and a description which can be expanded or truncated based on user interaction.
- Each card also has a "Open Linkedin Profile" link that leads to the original source.
- A checkbox is available for each card, likely for selection purposes.

1. **Interactions with SearchContext** :

- The `useSearch` hook provides access to `metaData` (search results), `emailsData` (additional data with email addresses), and `selectedProfiles` (profiles that have been selected for detailed view or other operations).
- The `toggleSelectedProfile` method from the context is used to handle the checkbox's state for each card.

1. **Utility Functions** :

- `truncateDescription`: If a description is too long, this function truncates it to show only the first few words with an ellipsis (`...`).
- `getEmailFromUrl`: Retrieves the email associated with a specific URL from `emailsData`.
- `toggleExpand`: Toggles the expanded state for descriptions in the cards.

1. **Responsive Behavior** :

- The component uses the `windowSize` state and an `effect` to adjust the layout of the cards based on the window's width.

  **Purpose** :
  The `ProfileCard` component is designed to showcase individual LinkedIn profile details. The visual representation is likely a card, with expandable sections to reveal more information. It offers a responsive design, adjusting its layout based on the window's width.

  **Styling & Layout** :
  The component employs the `mdb-react-ui-kit` library for its UI elements. This includes `MDBCard`, `MDBCardImage`, `MDBCardBody`, `MDBCardTitle`, `MDBCardText`, and others. These components help render a visually appealing card layout. The expandable sections and the card's overall layout may adjust based on the window's size to ensure a smooth user experience across various screen dimensions.

  **Interconnections** :

1. **State Management** : The component interfaces with the `SearchContext` via the `useSearch` hook. This provides access to states like `metaData`, `emailsData`, and `selectedProfiles`, as well as functions like `toggleSelectedProfile`.
2. **Children Components** : None identified in the initial snippet. Further exploration might reveal more.
3. **Parent Component** : Not identified from the current snippet.

**Functions & Methods** :

- `getEmailFromUrl`: Extracts the email address associated with a specific profile URL.
- `toggleExpand`: Manages the expanded/collapsed state of profile details, allowing users to view more or less information as needed.
- The `useEffect` hook: Handles window resizing, adjusting the component's layout based on the available width.
