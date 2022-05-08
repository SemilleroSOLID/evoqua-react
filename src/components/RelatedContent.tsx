import React from 'react';

import { Styles } from '../types';

/**
 * TODO: implement this. This currently renders an example of what could be
 * placed here.
 */
export default function RelatedContent(
  { style }: { style?: React.CSSProperties }
) {
  return (
    <dl style={style}>
      <dt style={styles.dt}>Code smells</dt>
      <dd style={styles.dd}>
        Any characteristic in the source code of a program that possibly
        indicates a deeper problem.
      </dd>

      <dt style={styles.dt}>Technical debt</dt>
      <dd style={styles.dd}>
        Reflects the implied cost of additional rework caused by choosing an
        easy (limited) solution now instead of using a better approach that
        would take longer.
      </dd>
  </dl>
  );
}

const styles: Styles = {
  dt: {
    fontWeight: 'bold',
  },
  dd: {
    marginBottom: '1em',
  },
};
