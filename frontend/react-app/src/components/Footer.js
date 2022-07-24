import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


function Footer() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Jack Culley '}
        {new Date().getFullYear()}
        {' - '}
        <Link color="inherit" href="https://www.cs.toronto.edu/~kriz/learning-features-2009-TR.pdf" target='_blank'>
          CIFAR-10 Dataset
        </Link>
      </Typography>
    );
  }
export default Footer