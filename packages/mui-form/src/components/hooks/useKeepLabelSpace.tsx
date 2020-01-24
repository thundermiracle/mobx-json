import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelSpace: {
    paddingTop: 16,
  },
});

interface HookKeepLabelSpaceProps {
  className?: string;
  keepLabelSpace?: boolean;
}

export default function useKeepLabelSpace({
  className,
  keepLabelSpace = false,
}: HookKeepLabelSpaceProps) {
  const classes = useStyles();

  return clsx({ [classes.labelSpace]: keepLabelSpace }, className);
}
