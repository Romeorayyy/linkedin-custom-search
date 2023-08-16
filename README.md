# Linkendin Custom Search - React Project Overview

This React project provides a custom interface for performing Google searches, displaying results, and offering related functionalities.

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

The `SearchForms.js` is the primary interface for users to define their search parameters and trigger searches. The component reads the current search state and updates it using methods from the `SearchContext`.

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

In essence, `Results.js` serves as the primary display area for search results. It consumes the `metaData` from the `SearchContext` to render results and uses the context's methods to handle user interactions, like loading more results.

### DataTable.js:

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
-

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
