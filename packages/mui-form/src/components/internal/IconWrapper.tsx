import * as React from 'react';

import clsx from 'clsx';
import { Grid, GridProps } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing(0.5),
  },
  icon: {
    position: 'absolute',
    top: 18,
    padding: theme.spacing(0.5),
  },
  iconDisabled: {
    opacity: 0.65,
  },
  content: {
    paddingLeft: 32 + theme.spacing(1),
    flex: 1,
    // width: 10, // add with to make flex:1 effect Input,type=date
  },
  hidden: {
    display: 'none',
  },
}));

type IconWrapperProps = {
  IconComponent?: any;
  iconClassName?: string;
  disabled?: boolean;
} & GridProps;

const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  IconComponent,
  iconClassName,
  className,
  disabled = false,
  hidden,
  ...restProps
}) => {
  const classes = useStyles();

  if (!IconComponent) {
    return (
      <span className={clsx({ [classes.hidden]: hidden })}>{children}</span>
    );
  }

  const iconPart = (
    <div
      className={clsx(classes.icon, iconClassName, {
        [classes.iconDisabled]: disabled,
      })}
    >
      <IconComponent />
    </div>
  );

  return (
    <Grid
      container
      spacing={1}
      alignItems="flex-end"
      className={clsx(className, classes.container)}
      hidden={hidden}
      {...restProps}
    >
      {iconPart}
      <Grid className={classes.content}>{children}</Grid>
    </Grid>
  );
};

export default IconWrapper;
