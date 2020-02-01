import * as React from 'react';

import clsx from 'clsx';
import { Grid, GridProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles({
  icon: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
});

type IconWrapperProps = {
  IconComponent?: any;
  iconClassName?: string;
} & GridProps;

const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  IconComponent,
  iconClassName,
  ...restProps
}) => {
  const classes = useStyles();

  if (!IconComponent) {
    return <>{children}</>;
  }

  const iconPart = (
    <Grid className={clsx(classes.icon, iconClassName)}>
      <IconComponent />
    </Grid>
  );

  return (
    <Grid container spacing={1} alignItems="flex-end" {...restProps}>
      {iconPart}
      <Grid item className={classes.content}>
        {children}
      </Grid>
    </Grid>
  );
};

export default IconWrapper;
