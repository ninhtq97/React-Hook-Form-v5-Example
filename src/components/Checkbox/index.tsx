import React, {
  ChangeEvent,
  ComponentProps,
  FC,
  forwardRef,
  useState,
} from 'react';
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from './Styles';

const Checkbox: FC<ComponentProps<typeof HiddenCheckbox>> = forwardRef(
  ({ className, checked = false, saveCache, ...props }, ref) => {
    const [active, setActive] = useState(checked);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setActive(e.target.checked);
      typeof saveCache === 'function' && saveCache(props.name);
    };

    return (
      <CheckboxContainer className={className}>
        <HiddenCheckbox
          checked={active}
          {...props}
          ref={ref}
          onChange={handleChange}
        />
        <StyledCheckbox checked={active}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
    );
  }
);

export default Checkbox;
