import React from 'react';
import { observer } from 'mobx-react';

import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, GridProps, Divider } from '@material-ui/core';
import { AnyObject } from '../components/ComponentTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    contents: {
      margin: theme.spacing(1),
    },
    text: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      margin: theme.spacing(3, 0, 3),
    },
    hidden: {
      display: 'none',
    },
  }),
);

type GridItemContainerProps = GridProps & {
  divider?: boolean;
  dividerProps?: AnyObject;
  primary?: string;
  primaryProps?: AnyObject;
  subPrimary?: string;
  subPrimaryProps?: AnyObject;
  secondary?: string;
  secondaryProps?: AnyObject;
};

const GridItemContainer: React.FC<GridItemContainerProps> = ({
  divider = false,
  dividerProps,
  primary,
  primaryProps,
  subPrimary,
  subPrimaryProps,
  secondary,
  secondaryProps,
  children,
  hidden,
  ...restProps
}) => {
  const classes = useStyles();

  let primaryPart;
  if (primary || subPrimary) {
    primaryPart = (
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h4" {...primaryProps}>
            {primary}
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="h6" {...subPrimaryProps}>
            {subPrimary}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  let secondaryPart;
  if (secondary) {
    secondaryPart = (
      <Typography color="textSecondary" variant="body2" {...secondaryProps}>
        {secondary}
      </Typography>
    );
  }

  let textPart;
  if (primaryPart || secondaryPart) {
    textPart = (
      <div className={classes.text}>
        {primaryPart}
        {secondaryPart}
      </div>
    );
  }

  let dividerPart;
  if (divider) {
    dividerPart = (
      <Divider variant="middle" className={classes.divider} {...dividerProps} />
    );
  }

  return (
    <div className={clsx(classes.root, { [classes.hidden]: hidden })}>
      <div className={classes.contents}>
        {textPart}
        <Grid item container spacing={2} {...restProps}>
          {children}
        </Grid>
      </div>
      {dividerPart}
    </div>
  );
};

export default observer(GridItemContainer);
