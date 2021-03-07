import { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id: string;
  index: number;
  value: number;
};

const TabPanel = (props: Props): ReactElement => {
  const {
    children,
    id,
    index,
    value,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-${index}`}
      aria-labelledby={`${id}-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
