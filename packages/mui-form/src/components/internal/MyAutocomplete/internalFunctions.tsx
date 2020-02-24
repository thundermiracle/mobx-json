import React from 'react';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { AutocompleteItem } from './MyAutocompleteTypes';

const needGroupBy = (suggestions?: AutocompleteItem[]): boolean => {
  if (
    suggestions == null ||
    suggestions.length === 0 ||
    !Array.isArray(suggestions)
  ) {
    return false;
  }

  const [firstSuggestion] = suggestions;
  return firstSuggestion.group != null;
};

const sortSuggestions = (
  suggestions?: AutocompleteItem[],
): AutocompleteItem[] | [] => {
  if (suggestions == null || suggestions.length === 0) {
    return [];
  }

  if (!needGroupBy(suggestions)) {
    // no need sort if group not exist
    return suggestions;
  }

  // sort asc
  return suggestions.sort(
    (a: AutocompleteItem, b: AutocompleteItem): number => {
      if (a.group == null || b.group == null) {
        return -1;
      }

      if (typeof a.group === 'number' && typeof b.group === 'number') {
        return a.group - b.group;
      }

      return -b.group.toString().localeCompare(a.group.toString());
    },
  );
};

const highlightSuggestion = (
  suggestion: AutocompleteItem,
  { inputValue }: any,
): JSX.Element => {
  // search value if label is not defined
  const targetStr = suggestion.label || suggestion.value;

  const matches = match(targetStr, inputValue);
  const parts = parse(targetStr, matches);

  return (
    <div>
      {parts.map((part, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{ fontWeight: part.highlight ? 700 : 400 }}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
};

const getSuggestionLabel = (suggestion: AutocompleteItem): string => {
  return suggestion.label || suggestion.value;
};

const groupBy = (suggestion: AutocompleteItem): string =>
  suggestion.group || '';

export {
  needGroupBy,
  sortSuggestions,
  highlightSuggestion,
  getSuggestionLabel,
  groupBy,
};
