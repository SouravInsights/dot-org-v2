/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFormReturn, useController, FieldValues } from 'react-hook-form';
import {
  Box,
  useRadio,
  useRadioGroup,
  HStack,
  VStack,
  ChakraRadioProps,
  useStyleConfig,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Tooltip,
  Icon,
} from '@raidguild/design-system';
import { FaInfoCircle } from 'react-icons/fa';

function RadioCard({ children, variant, size, ...props }: ChakraRadioProps) {
  const styles = useStyleConfig('RadioBox', { variant, size });
  const { getInputProps, getCheckboxProps } = useRadio({ ...props });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box {...checkbox} __css={styles}>
        {children}
      </Box>
    </Box>
  );
}

export interface CustomRadioBoxProps {
  name: string;
  label: string;
  tooltip?: string;
  localForm: UseFormReturn<FieldValues>;
  options: any;
  stack: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

type RadioBoxProps = CustomRadioBoxProps & ChakraRadioProps;

function RadioBox({ name, label, tooltip, localForm, options, stack, isRequired, size }: RadioBoxProps) {
  if (!localForm) return null;
  const { control } = localForm;
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    // rules: { required: { value: true, message: "Required field" } }
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  const Options = () =>
    options.map((v: any) => {
      const radio = getRadioProps({ value: v });
      return (
        <RadioCard key={v} size={size} {...radio}>
          {v}
        </RadioCard>
      );
    });

  const group = getRootProps();
  const error = errors[name] && errors[name]?.message;

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]}>
      <Stack>
        {label && (
          <FormLabel as='legend'>
            {label}
            {tooltip && (
              <Tooltip hasArrow placement='top' label={tooltip} aria-label='disclaimer tooltip' shouldWrapChildren>
                <Icon as={FaInfoCircle} />
              </Tooltip>
            )}
          </FormLabel>
        )}
        {stack === 'vertical' ? (
          <VStack {...group} alignItems='inherit'>
            <Options />
          </VStack>
        ) : (
          <HStack {...group}>
            <Options />
          </HStack>
        )}
        {typeof error === 'string' && <FormErrorMessage>{error}</FormErrorMessage>}
      </Stack>
    </FormControl>
  );
}

export default RadioBox;
