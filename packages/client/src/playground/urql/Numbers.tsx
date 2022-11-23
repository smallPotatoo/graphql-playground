import React, {useEffect, useState, FC} from 'react'
import {useMutation} from 'urql';
import css from '../../utils/css';
import {SAVE_NUMBERS} from '../../gql';

interface Props {
  onFocus: () => void;
  onUpdate: () => void;
}

const Numbers: FC<Props> = ({onFocus, onUpdate}) => {
  const [input, setInput] = useState('');

  const [{data}, saveNumbers] = useMutation(SAVE_NUMBERS);

  useEffect(() => {
    if (data) {
      onUpdate();
    }
  }, [data]);

  const error = data && !data.saveNumbers.length;

  return (
    <input
      type="text"
      className={css('input', error && 'status-error')}
      value={input}
      onChange={({currentTarget}) => {
        setInput(currentTarget.value);
      }}
      onFocus={onFocus}
      onBlur={() => saveNumbers({input})}
    />
  );
};

export default Numbers;
