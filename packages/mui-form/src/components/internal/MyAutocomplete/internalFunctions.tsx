import React from 'react';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { Checkbox } from '@material-ui/core';
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from '@material-ui/icons';

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

const suggestionContainsLabel = (suggestions?: AutocompleteItem[]): boolean => {
  if (suggestions == null || suggestions.length === 0) {
    return false;
  }

  const [firstSuggestion] = suggestions;

  return firstSuggestion.label != null;
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

const makeHighlightSuggestion = (checkbox: boolean) => (
  suggestion: AutocompleteItem,
  { inputValue, selected }: any,
): JSX.Element => {
  // search value if label is not defined
  const targetStr = suggestion.label || suggestion.value;

  const matches = match(targetStr, inputValue);
  const parts = parse(targetStr, matches);

  let checkboxPart;
  if (checkbox) {
    checkboxPart = (
      <Checkbox
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        style={{ marginRight: 8 }}
        checked={selected}
      />
    );
  }

  return (
    <div>
      {checkboxPart}
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

const highlightSuggestion = makeHighlightSuggestion(false);
const highlightSuggestionCheckbox = makeHighlightSuggestion(true);

const getSuggestionLabel = (suggestion: AutocompleteItem): string => {
  return suggestion.label || suggestion.value;
};

const groupBy = (suggestion: AutocompleteItem): string =>
  suggestion.group || '';

export {
  needGroupBy,
  suggestionContainsLabel,
  sortSuggestions,
  highlightSuggestion,
  highlightSuggestionCheckbox,
  getSuggestionLabel,
  groupBy,
};
