import { useEffect } from 'react';
import { Box, Flex, Button, SimpleGrid, Input, useToast } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useJoinState } from '../../context/joinState';

const inputs = [
  {
    label: 'What is your Discord handle?',
    placeholder: 'Include the unique identifier after the #, no @',
    name: 'discord',
  },
  {
    label: 'What is your Github Handle?',
    placeholder: 'no @',
    name: 'github',
  },
  {
    label: 'And of Telegram?',
    placeholder: 'no @',
    name: 'telegram',
  },
  {
    label: 'Your well flown Twitter bird?',
    placeholder: 'no @',
    name: 'twitter',
  },
];

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  discord: Yup.string().required(),
  github: Yup.string(),
  telegram: Yup.string(),
  twitter: Yup.string(),
});

// TODO handle address & ens fetch

const StepTwo = ({ handleBack, handleNext }: Props) => {
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...joinState.stage2 });
    console.log('reset set', JSON.stringify(joinState.stage2State));
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);
    setJoinState({
      ...joinState,
      stage2: { ...data },
    });
    handleNext();
  };
  // todo: set types
  const onError = (data: any) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            localForm={localForm}
          />
        ))}
      </SimpleGrid>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Next</Button>
      </Flex>
    </Box>
  );
};

export default StepTwo;
