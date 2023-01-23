import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from '@raidguild/design-system';
import { BLOG_CREATE_MUTATION } from '../gql/mutations';
import { client } from '../gql';

const useBlogsCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  type Blog = {
    title: string;
    authorName: string;
    description: string;
    tags: string[];
    content: string;
  };

  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useMutation(
    async (data: Blog) => {
      return client({}).request(BLOG_CREATE_MUTATION, {
        blog: {
          title: data.title || '',
          author_name: data.authorName || '',
          description: data.description || '',
          tags: data.tags || [],
          content: data.content || '',
        },
      });
    },
    {
      onSuccess: (data: any) => {
        console.log('success', data);
        queryClient.invalidateQueries(['blogsList']);
        toast.success({ title: 'Blog created', description: 'Check Console to confirm response type' });
        return;
        queryClient.invalidateQueries(['blogsDetail', data.blogs[0].slug]);
        queryClient.setQueryData(['blogsDetail', data.blogs[0].slug], data);
        router.push(`/blogs/${data.blogs[0].slug}`);
      },
      onError: (error: any) => {
        console.log('error', error);
        toast.error({ title: 'Error creating blog', description: error?.message });
      },
    },
  );
  return { mutate, mutateAsync, isLoading, isError, isSuccess };
};

export default useBlogsCreate;
