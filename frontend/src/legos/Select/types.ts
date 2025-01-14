import { SelectProps } from '@mui/material';
import { Maybe, Scalars } from 'types/GraphqlTypes';

export type ItemType = {
  label?: string;
  value?: Maybe<Scalars['String']>;
};

export type SelectPropsType = SelectProps & {
  label: string | null;
  items?: ItemType[];
  helperText?: boolean | string;
};
