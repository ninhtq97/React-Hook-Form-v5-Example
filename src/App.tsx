import { Button } from 'antd';
import 'antd/dist/antd.css';
import {
  createStore,
  StateMachineProvider,
  useStateMachine,
} from 'little-state-machine';
import cacheSelect from 'machine/cache-select';
import React from 'react';
import { useForm } from 'react-hook-form';
import Checkbox from './components/Checkbox';

let renderCount = 0;

const plainOptions = ['Apple', 'Pear', 'Orange'];

createStore({
  selected: [],
});

const currentPage = 1;

const YourComponent = () => {
  const { state, actions } = useStateMachine({
    cacheSelect,
    clearCache: (state, payload) => {
      return {
        selected: [],
      };
    },
  });

  const { watch, register, getValues } = useForm();
  const watchAllFields = watch();
  const getSelected = getValues();

  console.log('watchAllFields:', watchAllFields);
  console.log('getSelected:', getSelected);

  console.log('Global Cache State:', state);

  const handleCache = (id: string) => {
    try {
      actions.cacheSelect({ page: 1, rowId: id });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const selectedItem = state.selected.find((x) => x.page === currentPage);

  return (
    <>
      {plainOptions.map((e) => (
        <label key={e} style={{ marginRight: 10 }}>
          <Checkbox
            name={e}
            checked={!!selectedItem?.rowIds.find((x: string) => x === e)}
            ref={register}
            saveCache={handleCache}
          />
          {e}
        </label>
      ))}

      <Button
        onClick={() => {
          actions.clearCache([]);
        }}
      >
        Reset Cache
      </Button>
    </>
  );
};

const App = () => {
  renderCount++;
  return (
    <StateMachineProvider>
      <div>Render Count: {renderCount}</div>
      <YourComponent />
    </StateMachineProvider>
  );
};

export default App;
