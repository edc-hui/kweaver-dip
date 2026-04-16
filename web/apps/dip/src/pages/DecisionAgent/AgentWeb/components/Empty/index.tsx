// @ts-nocheck
import { memo, CSSProperties } from 'react';
import { Empty as EmptyAntd } from 'antd';
import intl from 'react-intl-universal';
import empty from '@decision-agent/assets/images/empty.png';
import styles from './index.module.less';

const Empty = ({
  description,
  className,
  style,
}: {
  description?: string;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <EmptyAntd
      className={[styles.empty, className].filter(Boolean).join(' ')}
      style={style}
      image={<img className={styles.image} src={empty} alt="" />}
      description={description || intl.get('dataAgent.noData')}
    />
  );
};

export default memo(Empty);
