// import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Textarea,
  Input,
  Button,
  Image,
  Stack,
  Select,
  CreatableSelect,
} from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// import { Web3Storage } from 'web3.storage';
import { useSession } from 'next-auth/react';
import _ from 'lodash';

import useBlogsCreate from '../../hooks/useBlogsCreate';
import CMSPageTemplate from '../../components/page-templates/CMSPageTemplate';
import PageTitle from '../../components/page-components/PageTitle';
// import supabase from '../../shared/Supabase';

interface Props {
  post: any;
}

function Publish({ post }: Props) {
  const { data: session } = useSession();
  const token = _.get(session, 'token') || '';
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useBlogsCreate(token);
  const localForm = useForm();
  const { reset, getValues } = localForm;
  // const [postTitle, setPostTitle] = useState('');
  // const [authorName, setAuthorName] = useState('');
  // const [description, setDescription] = useState('');
  // const [imagePath, setImagePath] = useState('');
  // const [postTagInput, setPostTagInput] = useState('');
  const [postTags, setPostTags] = useState([]);
  // const [content, setContent] = useState('');

  function clearData() {
    reset();
  }

  async function submitData(values: any) {
    await mutateAsync(values);
  }

  // const handleTagKeydown = (event) => {
  //   if (event.code == 'Comma' || event.code == 'Tab' || event.code == 'Enter') {
  //     event.preventDefault();
  //     addTag();
  //   }
  //   if (event.code == 'Backspace') {
  //     removeTag(postTags.length - 1);
  //   }
  // };
  // const addTag = () => {
  //   let newTag = { tag: postTagInput };
  //   setPostTags([...postTags, newTag]);
  //   setPostTagInput('');
  // };
  // const removeTag = (index) => {
  //   let data = [...postTags];
  //   data.splice(index, 1);
  //   setPostTags([...data]);
  // };

  return (
    <CMSPageTemplate>
      <PageTitle title='Create Post' />
      <VStack width='60vw' mx='auto' pb='2rem'>
        {/* Post Name */}
        <Input label='Post Title' name='title' localForm={localForm} />
        {/* Author Name */}
        <Input label='Author Name' name='authorName' localForm={localForm} />
        {/* Description */}
        <Input label='Brief Summary' name='description' localForm={localForm} />
        {/* Slug */}
        <Input label='Slug' name='slug' localForm={localForm} />
        {/* Image */}

        {/* Tags */}
        <VStack alignItems='flex-start' width='100%'>
          <Text size='lg'>Post Tags:</Text>
          <CreatableSelect
            label='Post Tags'
            name='tags'
            localForm={localForm}
            placeholder='Add tags'
            options={postTags}
            isMulti
          />
        </VStack>
        {/* Results */}
        <Box sx={{ width: `100%` }}>
          <Textarea label='Post' name='content' localForm={localForm} sx={{ width: `100%` }} />
          <Text size='sm'>This textarea accepts markdown</Text>
        </Box>
        <Button onClick={() => submitData(getValues())}>Send Post</Button>
      </VStack>
    </CMSPageTemplate>
  );
}

export default Publish;
